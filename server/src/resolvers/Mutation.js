const { forwardTo } = require("prisma-binding");

const wunderlist = require("../lib/wunderlist");

const Mutation = {
  upsertUser: forwardTo("db"),

  authUserWithWunderlist: async (parent, args, ctx, info) => {
    const { code } = args;

    const { accessToken } = await wunderlist.request.post.oauth({ code });
    const { data: currentUser } = await wunderlist.request.get.user();

    const loggedInUser = await ctx.db.mutation.upsertUser(
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

    console.log(loggedInUser);

    // wunderlistAPIInstanceForAuth.http;
  }
};

module.exports = Mutation;
