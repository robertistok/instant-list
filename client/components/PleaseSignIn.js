import styled from "styled-components";

import WunderlistAuth from "./WunderlistAuth";
import Loader from "./Loader";

import { useUser } from "../hooks/user";

const PleaseSignIn = props => {
  const { data, loading } = useUser();

  if (loading) {
    return <Loader />;
  }

  if (!data.me) {
    return (
      <Root>
        <p>Please Sign In before Continuing</p>
        <WunderlistAuth />
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

export default PleaseSignIn;
