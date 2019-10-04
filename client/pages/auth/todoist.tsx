import gql from "graphql-tag";
import { NextRouter } from "next/router";
import Router, { useRouter } from "next/router";
import { useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";

import { queries } from "../../hooks/user";

const AUTH_WITH_TODOIST_MUTATION = gql`
  mutation AUTH_WITH_TODOIST_MUTATION($code: String!, $state: String!) {
    authWithTodoist(code: $code, state: $state) {
      id
    }
  }
`;

interface Props {}

const TodoistAuth: React.FunctionComponent<Props> = (): React.ReactElement => {
  const [authWithTodoist] = useMutation(AUTH_WITH_TODOIST_MUTATION, {
    onCompleted: () => Router.push("/")
  });
  const router: NextRouter = useRouter();

  useEffect(() => {
    authWithTodoist({
      variables: { code: router.query.code, state: router.query.state },
      refetchQueries: [{ query: queries.CURRENT_USER_QUERY }],
      awaitRefetchQueries: true
    });
  }, []);

  return <div>Logging you in securely with Todoist, hold on..</div>;
};

export default TodoistAuth;
