import { useReducer } from "react";

import { Box, Button, Form, FormField, Grid, Heading, TextInput, TextArea } from "grommet";

import IngredientCard from "./IngredientCard";

function reducer(state, { type, payload }) {
  const { option } = payload.event;
  const { name, value } = payload.event.target;

  switch (type) {
    case "textInput":
      return { ...state, [name]: value };
    case "modifyIngredient":
      return {
        ...state,
        ingredients: state.ingredients.map((ingredient, index) =>
          index === payload.listElementId ? { ...ingredient, [name]: option || value } : ingredient
        )
      };
    default:
      throw new Error();
  }
}

const NewRecipe = ({ recipe }) => {
  const initialState = {
    ...recipe,
    ...(!recipe && {
      title: "",
      description: "",
      ingredients: [{ name: "", quantity: "", measurementUnit: "" }]
    })
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleInputChange = fnProps => event => {
    const { type = "textInput", listElementId } = fnProps;

    if (!event.option) {
      event.persist();
    }

    dispatch({ type, payload: { event, listElementId } });
  };

  return (
    <div>
      <Heading a11yTitle="Add new recipe" level="2">
        Add new recipe
      </Heading>
      <Box
        animation={{
          type: "slideUp",
          delay: 0,
          duration: 1000,
          size: "small"
        }}
        as={Form}
        gap="medium"
      >
        <FormField required>
          <TextInput
            name="title"
            onChange={handleInputChange()}
            placeholder="Title"
            value={state.title}
          />
        </FormField>
        <FormField required>
          <TextArea
            name="description"
            onChange={handleInputChange()}
            placeholder="Description"
            value={state.description}
          />
        </FormField>

        <Heading a11yTitle="Ingredients" level="3">
          Ingredients
        </Heading>
        <Grid a11yTitle="Ingredients list" gap="medium" mrgin="medium">
          {state.ingredients.map((ingredient, index) => {
            const handleIngredientInputChange = handleInputChange({
              type: "modifyIngredient",
              listElementId: index
            });

            return (
              <IngredientCard
                handleChange={handleIngredientInputChange}
                index={index}
                ingredient={ingredient}
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
    </div>
  );
};

export default NewRecipe;
