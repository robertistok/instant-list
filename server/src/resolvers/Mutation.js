const { forwardTo } = require("prisma-binding");

const wunderlist = require("../lib/wunderlist");
const todoist = require("../lib/todoist");

const { setToken, removeToken } = require("../lib/jwt");

const Mutation = {
  upsertUser: forwardTo("db"),

  async authWithWunderlist(parent, args, ctx, info) {
    const { code } = args;

    const { accessToken } = await wunderlist.request.post.oauth({ code });
    const { data: currentUser } = await wunderlist.request.get.user();

    const user = await ctx.db.mutation.upsertUser(
      {
        where: { email: currentUser.email },
        create: {
          email: currentUser.email,
          wunderlistAccessToken: accessToken,
          revision: currentUser.revision,
          name: currentUser.name
        },
        update: {
          wunderlistAccessToken: accessToken,
          revision: currentUser.revision,
          name: currentUser.name
        }
      },
      info
    );

    setToken({ data: { userId: user.id }, res: ctx.response });

    return user;
  },

  async authWithTodoist(parent, args, ctx, info) {
    const { code, state } = args;

    try {
      const { accessToken } = await todoist.request.post.oauth({ code, state });

      console.log(accessToken);
    } catch (err) {
      console.log(err);
    }
    // const { data: currentUser } = await wunderlist.request.get.user();

    // const user = await ctx.db.mutation.upsertUser(
    //   {
    //     where: { email: currentUser.email },
    //     create: {
    //       email: currentUser.email,
    //       wunderlistAccessToken: accessToken,
    //       revision: currentUser.revision,
    //       name: currentUser.name
    //     },
    //     update: {
    //       wunderlistAccessToken: accessToken,
    //       revision: currentUser.revision,
    //       name: currentUser.name
    //     }
    //   },
    //   info
    // );

    // setToken({ data: { userId: user.id }, res: ctx.response });

    return null;
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
        data: { wunderlistAccessToken: "" }
      },
      info
    );

    // clear the cookies
    removeToken({ res: ctx.response, tokenName: "token" });

    return { message: "Goodbye!" };
  }
};

module.exports = Mutation;
