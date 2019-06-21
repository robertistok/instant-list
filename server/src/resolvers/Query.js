const { forwardTo } = require("prisma-binding");

const Query = {
  async me(parent, args, ctx, info) {
    const { userId } = ctx.request;

    if (!userId) {
      return null;
    }

    return ctx.db.query.user({ where: { id: userId } });
  },

  async ownRecipes(parent, args, ctx, info) {
    const { userId } = ctx.request;

    if (!userId) {
      throw new Error("You must be signed in!");
    }

    return ctx.db.query.recipes({ where: { user: { id: userId } } });
  }
};

module.exports = Query;
