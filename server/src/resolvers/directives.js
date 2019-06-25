/* eslint-disable class-methods-use-this */
const { SchemaDirectiveVisitor } = require("graphql-tools");
const { defaultFieldResolver } = require("graphql");

class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    // destructuring the `resolve` property off of `field`, while providing a default value `defaultFieldResolver` in case `field.resolve` is undefined.
    const { resolve = defaultFieldResolver } = field;

    // eslint-disable-next-line no-param-reassign
    field.resolve = async (source, args, ctx, info) => {
      const { userId } = ctx.request;

      if (!userId) {
        throw new Error("You must be signed in!");
      }

      // runs if the condition above passes
      return resolve.call(this, source, args, ctx, info);
    };
  }
}

module.exports = { AuthDirective };
