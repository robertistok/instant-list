import { useReducer } from "react";
import gql from "graphql-tag";
import {
  Box,
  Button,
  Form,
  FormField,
  Grid,
  Heading,
  ResponsiveContext,
  TextInput,
  TextArea
} from "grommet";

import { useMutation } from "../hooks/apolloHooksWrappers";

import IngredientCard from "./IngredientCard";

const CREATE_RECIPE_MUTATION = gql`
  mutation CREATE_RECIPE_MUTATION($data: RecipeCreateInput!) {
    createRecipe(data: $data) {
      id
    }
  }
`;

const useRecipeState = props => {
  const recipe = props;

  const defaultIngredientState = { name: "", quantity: undefined, measurementUnit: undefined };
  const initialState = {
    title: "",
    description: "",
    servings: undefined,
    ingredients: [{ id: new Date().getTime(), ...defaultIngredientState }]
  };

  const reducer = (state, { type, payload }) => {
    switch (type) {
      case "textInput": {
        const { name, value } = payload.event.target;
        return { ...state, [name]: (!Number.isNaN(value) && Number(value)) || value };
      }
      case "modifyIngredient": {
        const { option, target } = payload.event;
        const nameWithoutIndex = target.name.split("-")[0];
        return {
          ...state,
          ingredients: state.ingredients.map(ingredient =>
            ingredient.id === payload.listElementId
              ? {
                  ...ingredient,
                  [nameWithoutIndex]:
                    option || (!Number.isNaN(target.value) && Number(target.value)) || target.value
                }
              : ingredient
          )
        };
      }
      case "addIngredient": {
        return {
          ...state,
          ingredients: [
            ...state.ingredients,
            { id: new Date().getTime(), ...defaultIngredientState }
          ]
        };
      }
      case "deleteIngredient": {
        return {
          ...state,
          ingredients: state.ingredients.filter(
            ingredient => ingredient.id !== payload.listElementId
          )
        };
      }
      default:
        throw new Error();
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    ...recipe,
    ...(!recipe && initialState)
  });

  return [state, dispatch];
};

const NewRecipe = ({ recipe }) => {
  const [state, dispatch] = useRecipeState(recipe);
  const [createRecipe] = useMutation(CREATE_RECIPE_MUTATION);

  const handleInputChange = (fnProps = {}) => event => {
    const { type = "textInput", listElementId } = fnProps;

    if (!event.option) {
      event.persist();
    }

    dispatch({ type, payload: { event, listElementId } });
  };

  const addIngredient = () => {
    dispatch({ type: "addIngredient" });
  };

  const deleteIngredient = listElementId => () => {
    dispatch({ type: "deleteIngredient", payload: { listElementId } });
  };

  const handleSave = () => {
    createRecipe({
      variables: {
        data: {
          ...{ ...state, ingredients: undefined },
          ingredients: {
            create: state.ingredients.map(({ id, ...ingredient }) => ({
              ...ingredient,
              id: typeof id === "number" ? undefined : id // remove the id if it's a new recipe
            }))
          }
        }
      }
    });
  };

  return (
    <ResponsiveContext.Consumer>
      {size => {
        const isSmall = ["small"].includes(size);

        return (
          <>
            <Heading a11yTitle="Create new recipe" level="2">
              Create new recipe
            </Heading>
            <Box
              a11yTitle="Create new recipe form section"
              as={Form}
              animation={{
                type: "slideUp",
                delay: 0,
                duration: 1000,
                size: "small"
              }}
              gap="medium"
              onSubmit={handleSave}
            >
              <Grid columns={isSmall ? "auto" : ["40%", "18%"]} gap="large">
                <FormField
                  a11yTitle="Title for your new recipe"
                  component={TextInput}
                  name="title"
                  onChange={handleInputChange()}
                  placeholder="Title"
                  required
                  value={state.title}
                />

                <FormField
                  a11yTitle="Number of servings"
                  component={TextInput}
                  name="servings"
                  onChange={handleInputChange()}
                  placeholder="Servings"
                  type="number"
                  value={state.servings}
                />
              </Grid>

              <FormField
                a11yTitle="Description for your new recipe"
                component={TextArea}
                name="description"
                onChange={handleInputChange()}
                placeholder="Description"
                required
                value={state.description}
              />

              <Heading a11yTitle="Ingredients" level="3">
                Ingredients
              </Heading>
              <Grid a11yTitle="Ingredients list" gap="medium" mrgin="medium">
                {state.ingredients.map((ingredient, index) => {
                  const handleIngredientInputChange = handleInputChange({
                    type: "modifyIngredient",
                    listElementId: ingredient.id
                  });

                  return (
                    <IngredientCard
                      addIngredient={addIngredient}
                      deleteIngredient={deleteIngredient(ingredient.id)}
                      handleChange={handleIngredientInputChange}
                      index={index}
                      ingredient={ingredient}
                      isFirstIngredient={index === 0}
                      isLastIngredient={index + 1 === state.ingredients.length}
                    />
                  );
                })}
              </Grid>

              <Button
                a11yTitle="Save recipe"
                alignSelf="start"
                color="wunderlistBlue"
                label="Save"
                primary
                type="submit"
              />
            </Box>
          </>
        );
      }}
    </ResponsiveContext.Consumer>
  );
};

export default NewRecipe;
