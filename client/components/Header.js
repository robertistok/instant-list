import NProgress from "nprogress";
import Router from "next/router";
import styled from "styled-components";

import SignOutButton from "./SignOutButton";

import { useUser } from "../hooks/user";

Router.onRouteChangeStart = () => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};

const Header = () => {
  const { data } = useUser();

  return <StyledHeader>{data.me && <SignOutButton userId={data.me.id} />}</StyledHeader>;
};

const StyledHeader = styled.header`
  display: flex;
  justify-content: flex-end;
  background-color: ${({ theme }) => theme.global.colors.wunderlistBlue};
  padding: 1rem;
  min-height: ${({ theme }) => theme.global.minHeaderHeight};
`;

export default Header;
