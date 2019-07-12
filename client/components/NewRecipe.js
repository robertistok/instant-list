import UpsertRecipe from "./UpsertRecipe/UpsertRecipeContainer";

import { UPSERT_COMPONENT_TYPES } from "../lib/constants";

const NewRecipe = () => {
  const recipe = JSON.parse(sessionStorage.getItem("recipe"));

  return <UpsertRecipe recipe={recipe} type={UPSERT_COMPONENT_TYPES.CREATE} />;
};

export default NewRecipe;
