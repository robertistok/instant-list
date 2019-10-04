/* eslint-disable no-alert */
import { useQuery } from "@apollo/react-hooks";

import UpsertRecipe from "./UpsertRecipe/UpsertRecipeContainer";
import Loader from "./common/Loader";
import ForOhFor from "./common/ForOhFor";

import { RECIPE_QUERY } from "./Recipe/Recipe";

import { UPSERT_COMPONENT_TYPES } from "../lib/constants";

const Recipe = ({ id }) => {
  const { data: { recipe } = { recipe: undefined }, loading } = useQuery(RECIPE_QUERY, {
    variables: { where: { id } }
  });

  if (loading) {
    return <Loader />;
  }

  if (!recipe) {
    return <ForOhFor message="Recipe not found..." />;
  }

  return <UpsertRecipe recipe={recipe} type={UPSERT_COMPONENT_TYPES.EDIT} />;
};

export default Recipe;
