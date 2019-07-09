import Link from "next/link";
import styled from "styled-components";

const LocalLink = ({ href, children }) => (
  <Link href={href} passHref>
    <StyledLink>{children}</StyledLink>
  </Link>
);

const StyledLink = styled.a`
  &:hover {
    cursor: pointer;
  }
`;

export default LocalLink;
