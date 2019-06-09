import NProgress from "nprogress";
import Router from "next/router";
import styled from "styled-components";

Router.onRouteChangeStart = () => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};

const Header = () => <StyledHeader />;

const StyledHeader = styled.header``;

export default Header;
