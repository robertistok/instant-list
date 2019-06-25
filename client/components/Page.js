import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Grommet } from "grommet";

import Meta from "./Meta";
import Header from "./Header";
import Loader from "./common/Loader";

import { useUser } from "../hooks/user";

export const colors = {
  wunderlistRed: "#DB4C3F",
  wunderlistBlue: "#2B88D9",
  brand: "#2B88D9",
  wunderlistGreen: "#65B01B",
  wunderlistYellow: "#E6B035",
  black: "#393939",
  darkGray: "#444444",
  wunderlistGray: "#5B5B5B",
  gray: "#737273",
  lightGray: "#A3A3A3",
  ultralightGray: "#F5F5F5",
  white: "#FAFAFA",

  maxWidth: "1240px",
  lightBorder: `1px solid rgb(163, 163, 163, 0.3)`
};

const grommetTheme = {
  global: {
    colors,
    minHeaderHeight: "6rem",
    maxWidth: "1000px",
    breakpoints: {
      medium: { value: 900 },
      small: { value: 600 }
    }
  }
};

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'radnika_next';
    src: url('/static/radnikanext-medium-webfont.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }
  html {
    box-sizing: border-box;
    font-size: 10px;
    height: 100%;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
    font-family: 'lato';
    height: 100%;
  }
  a {
    text-decoration: none;
    color: ${colors.black};
  }
  button {  font-family: 'lato'; }
  #__next {
    height: 100%;
  }
`;

const Page = ({ children }) => {
  const { loading } = useUser();

  if (loading) {
    return <Loader />;
  }

  return (
    <Grommet theme={grommetTheme} full cssVars>
      <StyledPage>
        <GlobalStyle />
        <Meta />
        <Header />
        <Inner>{children}</Inner>
      </StyledPage>
    </Grommet>
  );
};

const StyledPage = styled.div`
  background: var(--white);
  color: var(--black);
  min-height: 100%;
`;

const Inner = styled.div`
  max-width: var(--maxWidth);
  margin: 0 auto;
  padding: 2rem;
  height: ${({ theme }) => `calc(100% - ${theme.global.minHeaderHeight}`} );
`;

export default Page;
