import Link from "next/link";
import styled from "styled-components";

const RecipeLink = ({ id, children }) => (
  <Link href={`/recipe?id=${id}`} as={`/recipe/${id}`} passHref>
    <StyledLink>{children}</StyledLink>
  </Link>
);

const StyledLink = styled.a`
  &:hover {
    cursor: pointer;
  }
`;

export default RecipeLink;
