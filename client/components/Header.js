import React from "react";
import NProgress from "nprogress";
import Router from "next/router";
import Link from "next/link";
import styled from "styled-components";
import { LinkPrevious, Configure, Home, ChapterAdd } from "grommet-icons";

import NavButton from "./common/NavButton";
import SignOutButton from "./SignOutButton";

import useUser from "../hooks/user";

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
      {data.me && <NavButton icon={<LinkPrevious color="white" />} onClick={() => Router.back()} />}

      <Link href="/">
        <NavButton icon={<Home color="white" />} tooltipLabel="Home" />
      </Link>

      {data.me && (
        <Link href="/new-recipe">
          <NavButton icon={<ChapterAdd color="white" />} tooltipLabel="New recipe" />
        </Link>
      )}

      {data.me && (
        <Link href="/settings">
          <NavButton
            className="left-align"
            icon={<Configure color="white" />}
            tooltipLabel="Settings"
          />
        </Link>
      )}
      {data.me && <SignOutButton userId={data.me.id} tooltipLabel="Sign out" />}
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  padding: 0px 20px;
  display: flex;
  background-color: ${({ theme }) => theme.global.colors.brand};
  min-height: ${({ theme }) => theme.global.minHeaderHeight};

  .left-align {
    margin-left: auto;
  }
`;

export default Header;
