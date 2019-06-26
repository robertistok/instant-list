import Link from "next/link";
import styled from "styled-components";

const RecipeLink = ({ path = "/recipe", id, children }) => (
  <Link href={`${path}?id=${id}`} as={`${path}/${id}`} passHref>
    <StyledLink>{children}</StyledLink>
  </Link>
);

const StyledLink = styled.a`
  &:hover {
    cursor: pointer;
  }
`;

export default RecipeLink;
