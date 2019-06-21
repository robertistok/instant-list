import Link from "next/link";

const RecipeLink = ({ id, children }) => (
  <Link as={`/recipe/${id}`} href={`/recipe?id=${id}`}>
    {children}
  </Link>
);

export default RecipeLink;
