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

type SignOutButtonProps = {
  userId: string;
  tooltipLabel: string;
};

const SignOutButton: React.FunctionComponent<SignOutButtonProps> = ({ userId, tooltipLabel }) => {
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
    <NavButton
      icon={<Logout color="white" />}
      onClick={handleSignOut}
      tooltipLabel={tooltipLabel}
    />
  );
};

export default SignOutButton;
