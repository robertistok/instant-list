import Link from "next/link";

const RecipeLink = ({ id, children }) => (
  <Link href={`/recipe?id=${id}`} as={`/recipe/${id}`}>
    {children}
  </Link>
);

export default RecipeLink;
