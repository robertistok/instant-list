import withApollo from "next-with-apollo";
import ApolloClient from "apollo-boost";
import getConfig from "next/config";

const {
  publicRuntimeConfig: { devEndpoint, prodEndpoint }
} = getConfig();

function createClient({ headers }) {
  return new ApolloClient({
    uri: process.env.NODE_ENV === "development" ? devEndpoint : prodEndpoint,
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: "include"
        },
        headers
      });
    },
    // local data
    clientState: {}
  });
}

export default withApollo(createClient);
