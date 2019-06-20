const { forwardTo } = require("prisma-binding");

const wunderlist = require("../lib/wunderlist");
const { setToken, removeToken } = require("../lib/jwt");

const Mutation = {
  upsertUser: forwardTo("db"),

  // eslint-disable-next-line no-unused-vars
  async authWithWunderlist(parent, args, ctx, info) {
    const { code } = args;

    const { accessToken } = await wunderlist.request.post.oauth({ code });
    const { data: currentUser } = await wunderlist.request.get.user();

    const user = await ctx.db.mutation.upsertUser({
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
    });

    setToken({ data: { userId: user.id }, res: ctx.response });

    return user;
  },

  createRecipe(parent, args, ctx, info) {
    const { userId } = ctx.request;

    if (!userId) {
      throw new Error("You must be signed in!");
    }

    return ctx.db.mutation.createRecipe({
      data: { ...args.data, user: { connect: { id: userId } } }
    });
  },

  async signOut(parent, args, ctx, info) {
    // remove access token from db
    await ctx.db.mutation.updateUser({
      where: args.where,
      data: { wunderlistAccessToken: "" }
    });

    // clear the cookies
    removeToken({ res: ctx.response, tokenName: "token" });

    return { message: "Goodbye!" };
  }
};

module.exports = Mutation;
