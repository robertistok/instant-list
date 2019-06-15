import NewRecipe from "./NewRecipe";

import { useUser } from "../hooks/user";

const Recipes = () => {
  const { data } = useUser();

  if (!data.me) {
    return null;
  }

  return (
    <div>
      <NewRecipe />
    </div>
  );
};

export default Recipes;
