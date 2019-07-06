import styled from "styled-components";

import TodoistAuth from "./TodoistAuth";
import Loader from "./common/Loader";

import useUser from "../hooks/user";

const PleaseSignIn = props => {
  const { data, loading } = useUser();

  if (loading) {
    return <Loader />;
  }

  if (!data.me) {
    return (
      <Root>
        <SignInInstructions>
          Please sign in with your Todoist account to continue
        </SignInInstructions>

        <TodoistAuth />
      </Root>
    );
  }
  return props.children;
};

const Root = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const SignInInstructions = styled.p``;

export default PleaseSignIn;
