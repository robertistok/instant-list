import NProgress from "nprogress";
import Router from "next/router";
import Link from "next/link";
import styled from "styled-components";

import NavButton from "./common/NavButton";
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

  return (
    <StyledHeader>
      <Link href="/">
        <NavButton label="Home" />
      </Link>

      <Link href="/new-recipe">
        <NavButton label="New Recipe" />
      </Link>

      {data.me && <SignOutButton className="left-align" userId={data.me.id} />}
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  display: flex;
  background-color: ${({ theme }) => theme.global.colors.wunderlistBlue};
  min-height: ${({ theme }) => theme.global.minHeaderHeight};

  .left-align {
    margin-left: auto;
  }
`;

export default Header;
