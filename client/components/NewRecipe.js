import gql from "graphql-tag";

import EditRecipe from "./EditRecipe/EditRecipe";

import { useMutation } from "../hooks/apolloHooksWrappers";
import { useUpsertRecipeState } from "../state/recipe";

const CREATE_RECIPE_MUTATION = gql`
  mutation CREATE_RECIPE_MUTATION($data: RecipeCreateInputWithoutUser!) {
    createRecipe(data: $data) {
      id
    }
  }
`;

const NewRecipe = ({ recipe }) => {
  const [state, dispatch] = useUpsertRecipeState(recipe);
  const [createRecipe] = useMutation(CREATE_RECIPE_MUTATION);

  const addIngredient = () => {
    dispatch({ type: "addIngredient" });
  };

  const deleteIngredient = listElementId => () => {
    dispatch({ type: "deleteIngredient", payload: { listElementId } });
  };

  const addStep = () => {
    dispatch({ type: "addStep" });
  };

  const deleteStep = listElementId => () => {
    dispatch({ type: "deleteStep", payload: { listElementId } });
  };

  const handleInputChange = (fnProps = {}) => event => {
    const { type = "textInput", listElementId } = fnProps;

    if (!event.option) {
      event.persist();
    }

    dispatch({ type, payload: { event, listElementId } });
  };

  const handleSave = () => {
    createRecipe({
      variables: {
        data: {
          ...state,
          steps: { set: state.steps },
          ingredients: {
            create: state.ingredients.map(({ id, ...ingredient }) => ({
              ...{ ...ingredient, name: undefined },
              ingredient: {
                create: {
                  name: ingredient.name
                }
              },
              id: typeof id === "number" ? undefined : id // remove the id if it's a new recipe
            }))
          }
        }
      }
    });
  };

  return (
    <EditRecipe
      addIngredient={addIngredient}
      addStep={addStep}
      deleteIngredient={deleteIngredient}
      deleteStep={deleteStep}
      handleInputChange={handleInputChange}
      handleSave={handleSave}
      {...state}
    />
  );
};

export default NewRecipe;
