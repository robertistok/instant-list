import gql from "graphql-tag";
import { Button } from "grommet";
import { FormNextLink } from "grommet-icons";
import { queries } from "../hooks/user";

import { useMutation } from "../hooks/apolloHooksWrappers";
import useLoader from "../hooks/loader";

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION($where: UserWhereUniqueInput!) {
    signOut(where: $where) {
      message
    }
  }
`;

const SignOutButton = ({ userId }) => {
  const [signOut, { loading }] = useMutation(SIGN_OUT_MUTATION);
  useLoader({ loading });

  const handleSignOut = () => {
    signOut({
      variables: { where: { id: userId } },
      refetchQueries: [{ query: queries.CURRENT_USER_QUERY }]
    });
  };

  return (
    <Button
      color="white"
      icon={<FormNextLink color="white" />}
      label="Sign out"
      margin="xsmall"
      onClick={handleSignOut}
      plain
      reverse
    />
  );
};

export default SignOutButton;
