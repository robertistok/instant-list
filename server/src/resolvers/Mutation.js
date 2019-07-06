const { forwardTo } = require("prisma-binding");
const camelcaseKeys = require("camelcase-keys");

const todoist = require("../lib/todoist");
const { setToken, removeToken } = require("../lib/jwt");
const { NotAllowedError, NotFoundError } = require("../lib/errors");

const Mutation = {
  upsertUser: forwardTo("db"),

  async authWithTodoist(parent, args, ctx, info) {
    const { code, state } = args;

    const { accessToken } = await todoist.request.post.oauth({ code, state });

    const { user: todoistUser } = await todoist.request.post.sync({ resource_types: ["user"] });

    const userProps = {
      email: todoistUser.email,
      todoistAccessToken: accessToken,
      todoistId: todoistUser.id,
      avatarSmall: todoistUser.avatar_small,
      avatarMedium: todoistUser.avatar_medium,
      avatarBig: todoistUser.avatar_big,
      name: todoistUser.full_name
    };

    const user = await ctx.db.mutation.upsertUser(
      {
        where: { todoistId: todoistUser.id },
        create: userProps,
        update: userProps
      },
      info
    );

    setToken({ data: { userId: user.id }, res: ctx.response });

    return user;
  },

  upsertRecipe(parent, args, ctx, info) {
    const { userId } = ctx.request;
    const { where, create, update } = args;

    return ctx.db.mutation.upsertRecipe(
      {
        where,
        create: { ...create, user: { connect: { id: userId } } },
        update: { ...update, user: { connect: { id: userId } } }
      },
      info
    );
  },

  async signOut(parent, args, ctx, info) {
    const { userId } = ctx.request;
    const { id } = args.where;

    if (id !== userId) {
      throw new NotAllowedError();
    }

    // remove access token from db
    await ctx.db.mutation.updateUser(
      {
        where: { id: args.where.id },
        data: { todoistAccessToken: "" }
      },
      info
    );

    // clear the cookies
    removeToken({ res: ctx.response, tokenName: "token" });

    return { message: "Goodbye!" };
  },

  async deleteRecipe(parent, args, ctx, info) {
    const { where } = args;
    const recipe = await ctx.db.query.recipe({ where }, `{ id, user { id }}`);

    if (!recipe) {
      throw new NotFoundError(`Recipe with ${where.id} not found`);
    }

    if (recipe.user.id !== ctx.request.userId) {
      throw new NotAllowedError();
    }

    return ctx.db.mutation.deleteRecipe({ where }, info);
  },

  async assignListToCurrentUser(parent, args, ctx, info) {
    const { projectId, listType } = args;
    const { userId } = ctx.request;

    const selectedProject = await ctx.todoist.request.get.project({ id: projectId });

    if (!selectedProject) {
      throw new NotFoundError("Project not found..");
    }

    const projectToInsert = {
      todoistId: selectedProject.id,
      ...camelcaseKeys(selectedProject)
    };
    delete projectToInsert.id; // it's going to be auto generated

    if (listType === "Shopping") {
      return ctx.db.mutation.updateUser(
        {
          where: { id: userId },
          data: { shoppingList: { upsert: { update: projectToInsert, create: projectToInsert } } }
        },
        info
      );
    }

    return null;
  }
};

module.exports = Mutation;
