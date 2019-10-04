import UpsertRecipe from "./UpsertRecipe/UpsertRecipeContainer";

import { UPSERT_COMPONENT_TYPES } from "../lib/constants";

const NewRecipe = () => {
  return <UpsertRecipe type={UPSERT_COMPONENT_TYPES.CREATE} />;
};

export default NewRecipe;
