import Link from "next/link";
import styled from "styled-components";

interface LocalLinkProps {
  href: string;
  children: React.ReactNode;
}

const LocalLink: React.FunctionComponent<LocalLinkProps> = ({ href, children }) => (
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
