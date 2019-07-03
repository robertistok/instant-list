const { GraphQLServer } = require("graphql-yoga");

const Mutation = require("./resolvers/Mutation");
const Query = require("./resolvers/Query");
const { AuthDirective } = require("./resolvers/directives");
const db = require("./db");
const todoist = require("./lib/todoist");

// Create the GraphQL Yoga Server

function createServer() {
  return new GraphQLServer({
    typeDefs: "src/schema.graphql",
    resolvers: {
      Mutation,
      Query
    },
    schemaDirectives: {
      authenticated: AuthDirective
    },
    resolverValidationOptions: {
      requireResolversForResolveType: false
    },

    context: req => {
      const { user } = req.request;
      return { ...req, db, todoist: todoist({ accessToken: user.todoistAccessToken }) };
    }
  });
}

module.exports = createServer;
