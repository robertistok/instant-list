import gql from "graphql-tag";
import { BaseRouter } from "next-server/dist/lib/router/router";
import Router, { useRouter } from "next/router";
import { useEffect } from "react";
import { useMutation } from "react-apollo-hooks";

import { queries } from "../../hooks/user";

const AUTH_WITH_TODOIST_MUTATION = gql`
  mutation AUTH_WITH_TODOIST_MUTATION($code: String!, $state: String!) {
    authWithTodoist(code: $code, state: $state) {
      id
    }
  }
`;

interface Props {}

const TodoistAuth: React.FunctionComponent<Props> = () => {
  const authWithTodoist = useMutation(AUTH_WITH_TODOIST_MUTATION);
  const router: BaseRouter = useRouter();

  useEffect(() => {
    authWithTodoist({
      variables: { code: router.query.code, state: router.query.state },
      refetchQueries: [{ query: queries.CURRENT_USER_QUERY }],
      awaitRefetchQueries: true,
      update: () => Router.push("/"),
    });
  }, []);

  return <div>Logging you in securely with Todoist, hold on..</div>;
};

export default TodoistAuth;
