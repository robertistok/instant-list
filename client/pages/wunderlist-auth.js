import { useEffect } from "react";
import { withRouter } from "next/router";
import { useMutation } from "react-apollo-hooks";
import gql from "graphql-tag";

const AUTH_USER_WITH_WUNDERLIST_MUTATION = gql`
  mutation AUTH_USER_WITH_WUNDERLIST_MUTATION($code: String) {
    authUserWithWunderlist(code: $code) {
      id
    }
  }
`;

const WunderlistAuth = ({ router }) => {
  const authUserWithWunderlist = useMutation(AUTH_USER_WITH_WUNDERLIST_MUTATION);

  useEffect(() => {
    authUserWithWunderlist({ variables: { code: router.query.code } });
  }, []);

  // co;

  return <div>WL auth</div>;
};

export default withRouter(WunderlistAuth);
