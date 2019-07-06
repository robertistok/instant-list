// const { forwardTo } = require("prisma-binding");
const camelcaseKeys = require("camelcase-keys");

const { NotAllowedError } = require("../lib/errors");

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
      throw new NotAllowedError();
    }

    return recipe;
  },

  async ownRecipes(parent, args, ctx, info) {
    return ctx.db.query.recipes({ where: { user: { id: ctx.request.userId } } }, info);
  },

  async usersProjectsFromTodoist(parent, args, ctx) {
    const { projects } = await ctx.todoist.request.post.sync({ resource_types: ["projects"] });
    return projects.map(project => ({ ...camelcaseKeys(project), todoistId: project.id }));
  }
};

module.exports = Query;
