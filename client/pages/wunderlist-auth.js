import { useEffect } from "react";
import Router, { withRouter } from "next/router";
import { useMutation } from "react-apollo-hooks";
import gql from "graphql-tag";

import { queries } from "../hooks/user";

const AUTH_WITH_WUNDERLIST_MUTATION = gql`
  mutation AUTH_WITH_WUNDERLIST_MUTATION($code: String) {
    authWithWunderlist(code: $code) {
      id
    }
  }
`;

const WunderlistAuth = ({ router }) => {
  const authWithWunderlist = useMutation(AUTH_WITH_WUNDERLIST_MUTATION);

  useEffect(() => {
    authWithWunderlist({
      variables: { code: router.query.code },
      refetchQueries: [{ query: queries.CURRENT_USER_QUERY }],
      awaitRefetchQueries: true,
      update: () => Router.push("/")
    });
  }, []);

  return <div>Logging you in securely with Wunderlist, hold on..</div>;
};

export default withRouter(WunderlistAuth);
