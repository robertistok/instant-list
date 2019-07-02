import gql from "graphql-tag";
import { Logout } from "grommet-icons";

import NavButton from "./common/NavButton";
import Loader from "./common/Loader";

import { queries } from "../hooks/user";
import { useMutation } from "../hooks/apolloHooksWrappers";

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION($where: UserWhereUniqueInput!) {
    signOut(where: $where) {
      message
    }
  }
`;

const SignOutButton = ({ userId, ...rest }) => {
  const [signOut, { loading }] = useMutation(SIGN_OUT_MUTATION);

  const handleSignOut = () => {
    signOut({
      variables: { where: { id: userId } },
      refetchQueries: [{ query: queries.CURRENT_USER_QUERY }]
    });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <NavButton icon={<Logout color="white" />} margin="xsmall" onClick={handleSignOut} {...rest} />
  );
};

export default SignOutButton;
