const { forwardTo } = require("prisma-binding");

const todoist = require("../lib/todoist");

const { setToken, removeToken } = require("../lib/jwt");

const Mutation = {
  upsertUser: forwardTo("db"),

  async authWithTodoist(parent, args, ctx, info) {
    const { code, state } = args;

    const { accessToken } = await todoist.request.post.oauth({ code, state });

    const { user: todoistUser } = await todoist.request.post.sync({ resource_types: ["user"] });
    const userProps = {
      email: todoistUser.email,
      todoistAccessToken: accessToken,
      avatar_small: todoistUser.avatar_small,
      avatar_medium: todoistUser.avatar_medium,
      avatar_big: todoistUser.avatar_big,
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
      throw new Error("You cannot do that!");
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
  }
};

module.exports = Mutation;
