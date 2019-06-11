const { forwardTo } = require("prisma-binding");

const Query = {
  me: async (parent, args, ctx, info) => {
    const { userId } = ctx.request;

    if (!userId) {
      return null;
    }

    return ctx.db.query.user({ where: { id: userId } });
  }
};

module.exports = Query;
