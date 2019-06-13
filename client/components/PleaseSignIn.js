import styled from "styled-components";

import WunderlistAuth from "./WunderlistAuth";
import Loader from "./Loader";

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
          Please sign in with your Wunderlist account to continue
        </SignInInstructions>

        <WunderlistAuth />
      </Root>
    );
  }
  return props.children;
};

const Root = styled.div`
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const SignInInstructions = styled.section`
  margin-bottom: auto;
`;

export default PleaseSignIn;
