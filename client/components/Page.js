import React from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import Meta from "./Meta";
import Header from "./Header";

const theme = {
  wunderlistRed: "#DB4C3F",
  wunderlistBlue: "#2B88D9",
  wunderlistGreen: "#65B01B",
  wunderlistYellow: "#E6B035",
  black: "#393939",
  darkGray: "#444444",
  wunderlistGray: "#5B5B5B",
  gray: "#737273",
  lightgray: "#A3A3A3",
  white: "#FAFAFA",
  maxWidth: "1000px"
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
    color: ${theme.black};
  }
  button {  font-family: 'lato'; }
  #__next {
    height: 100%;
  }
`;

const Page = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <StyledPage>
        <GlobalStyle />
        <Meta />
        <Header />
        <Inner>{children}</Inner>
      </StyledPage>
    </ThemeProvider>
  );
};

const StyledPage = styled.div`
  background: ${props => props.theme.white};
  color: ${props => props.theme.black};
  height: 100%;
`;

const Inner = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 2rem;
`;

export default Page;
