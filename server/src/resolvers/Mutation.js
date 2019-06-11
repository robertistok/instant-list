const { forwardTo } = require("prisma-binding");

const wunderlist = require("../lib/wunderlist");
const { setToken } = require("../lib/jwt");

const Mutation = {
  upsertUser: forwardTo("db"),

  // eslint-disable-next-line no-unused-vars
  authUserWithWunderlist: async (parent, args, ctx, info) => {
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
  }
};

module.exports = Mutation;
