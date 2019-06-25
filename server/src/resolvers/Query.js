// const { forwardTo } = require("prisma-binding");

const Query = {
  async me(parent, args, ctx, info) {
    const { userId } = ctx.request;

    if (!userId) {
      return null;
    }

    return ctx.db.query.user({ where: { id: userId } }, info);
  },

  async recipe(parent, args, ctx, info) {
    const recipe = await ctx.db.query.recipe(args, info);

    const ownsRecipe = recipe.user.id === ctx.request.userId;

    if (!ownsRecipe) {
      throw new Error("You can't see this");
    }

    return recipe;
  },

  async ownRecipes(parent, args, ctx, info) {
    return ctx.db.query.recipes({ where: { user: { id: ctx.request.userId } } }, info);
  }
};

module.exports = Query;
