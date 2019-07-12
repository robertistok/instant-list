import gql from "graphql-tag";
import Router from "next/router";
import { useState, useEffect } from "react";
import { useMutation } from "react-apollo-hooks";

import UpsertRecipe from "./UpsertRecipe";

import { useUpsertRecipeState } from "../../state/recipe";
import { RECIPE_QUERY } from "../Recipe/Recipe";
import { UPSERT_COMPONENT_TYPES } from "../../lib/constants";

const UPSERT_RECIPE_MUTATION = gql`
  mutation UPSERT_RECIPE_MUTATION(
    $where: RecipeWhereUniqueInput!
    $create: RecipeCreateInputWithoutUser!
    $update: RecipeUpdateInputWithoutUser!
  ) {
    upsertRecipe(where: $where, create: $create, update: $update) {
      id
    }
  }
`;

const UpsertRecipeContainer = ({ recipe, type }) => {
  const [
    state,
    {
      addIngredient,
      addStep,
      deleteIngredient,
      deleteStep,
      updateState,
      updateIngredient,
      updateStep
    }
  ] = useUpsertRecipeState(recipe);
  const [ingredientsToDelete, setIngredientsToDelete] = useState([]);
  const upsertRecipe = useMutation(UPSERT_RECIPE_MUTATION, {
    refetchQueries: ({ data }) => [
      { query: RECIPE_QUERY, variables: { where: { id: data.upsertRecipe.id } } }
    ]
  });

  useEffect(() => {
    if (type === UPSERT_COMPONENT_TYPES.CREATE) {
      sessionStorage.setItem("recipe", JSON.stringify(state));
    }
  }, [state]);

  const handleAddIngredient = () => addIngredient();

  const handleDeleteIngredient = listElementId => () => {
    setIngredientsToDelete([...ingredientsToDelete, listElementId]);
    deleteIngredient({ listElementId });
  };

  const handleAddStep = () => addStep();

  const handleDeleteStep = listElementId => () => deleteStep({ listElementId });

  const handleUpdateState = event => {
    const { name, value } = event.target;

    updateState({
      name,
      value: (!Number.isNaN(value) && Number(value)) || (Boolean(value) && value) || null
    });
  };

  const handleUpdateStep = listElementId => event =>
    updateStep({ listElementId, value: event.target.value });

  const handleUpdateIngredient = listElementId => event => {
    const { option, target } = event;
    const nameWithoutIndex = target.name.split("-")[0];

    const value = option || (!Number.isNaN(target.value) && Number(target.value)) || target.value;

    updateIngredient({ listElementId, name: nameWithoutIndex, value });
  };

  const handleSave = () => {
    // clean up this function
    upsertRecipe({
      variables: {
        where: {
          // if no recipe, we need to pass in a random id for the mutation to not break
          id: recipe ? recipe.id : new Date().getTime()
        },
        create: {
          ...state,
          id: undefined,
          __typename: undefined,
          steps: { set: state.steps },
          ingredients: {
            create: state.ingredients.map(({ id, ...ingredient }) => ({
              ...ingredient,
              __typename: undefined,
              id: id.includes("new") ? undefined : id // remove the id if it's a new recipe
            }))
          }
        },
        update: {
          ...state,
          id: undefined,
          __typename: undefined,
          steps: { set: state.steps },
          ingredients: {
            create: state.ingredients
              .filter(({ id }) => id.includes("new"))
              .map(ingredient => ({ ...ingredient, id: undefined })),
            deleteMany: ingredientsToDelete.filter(id => !id.includes("new")).map(id => ({ id })),
            updateMany: state.ingredients
              .filter(({ id }) => !id.includes("new"))
              .map(ingredient => ({
                where: { id: ingredient.id },
                data: { ...ingredient, id: undefined, __typename: undefined }
              }))
          }
        }
      },
      update: () => Router.push(`/`)
    });
  };

  return (
    <UpsertRecipe
      addIngredient={handleAddIngredient}
      addStep={handleAddStep}
      deleteIngredient={handleDeleteIngredient}
      deleteStep={handleDeleteStep}
      handleUpdateState={handleUpdateState}
      handleUpdateStep={handleUpdateStep}
      handleUpdateIngredient={handleUpdateIngredient}
      handleSave={handleSave}
      isEditComponent={type === UPSERT_COMPONENT_TYPES.EDIT}
      recipe={state}
      type={type}
    />
  );
};

export default UpsertRecipeContainer;
