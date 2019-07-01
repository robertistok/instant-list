import { useEffect } from "react";
import Router, { withRouter } from "next/router";
import { useMutation } from "react-apollo-hooks";
import gql from "graphql-tag";

import { queries } from "../../hooks/user";

const AUTH_WITH_TODOIST_MUTATION = gql`
  mutation AUTH_WITH_TODOIST_MUTATION($code: String!, $state: String!) {
    authWithTodoist(code: $code, state: $state) {
      id
    }
  }
`;

const TodoistAuth = ({ router }) => {
  const authWithTodoist = useMutation(AUTH_WITH_TODOIST_MUTATION);

  useEffect(() => {
    authWithTodoist({
      variables: { code: router.query.code, state: router.query.state },
      refetchQueries: [{ query: queries.CURRENT_USER_QUERY }],
      awaitRefetchQueries: true,
      update: () => Router.push("/")
    });
  }, []);

  return <div>Logging you in securely with Todoist, hold on..</div>;
};

export default withRouter(TodoistAuth);
