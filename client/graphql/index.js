import ApolloClient from "apollo-boost";

const GRAPHQL_URL = "http://localhost:4000";

const client = new ApolloClient({
  uri: GRAPHQL_URL
});

export default client;
