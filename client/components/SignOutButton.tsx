import gql from "graphql-tag";
import { Logout } from "grommet-icons";
import Router from "next/router";
import { useMutation } from "@apollo/react-hooks";

import NavButton from "./common/NavButton";
import Loader from "./common/Loader";

import { queries } from "../hooks/user";
import useUser from "../hooks/user";

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
  const [signOut, { loading }] = useMutation(SIGN_OUT_MUTATION, {
    onCompleted: () => Router.push("/"),
    awaitRefetchQueries: true,
    refetchQueries: [{ query: queries.CURRENT_USER_QUERY }]
  });

  const handleSignOut = () => signOut({ variables: { where: { id: userId } } });

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
