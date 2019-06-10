import App, { Container } from "next/app";
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";

import Page from "../components/Page";
import withData from "../lib/withData";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
  }

  render() {
    const { Component, apollo, pageProps } = this.props;

    return (
      <Container>
        <ApolloProvider client={apollo}>
          <ApolloHooksProvider client={apollo}>
            <Page>
              <Component {...pageProps} />
            </Page>
          </ApolloHooksProvider>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withData(MyApp);
