import { useReducer } from "react";

import {
  Box,
  Button,
  Form,
  FormField,
  Grid,
  Heading,
  ResponsiveContext,
  Select,
  TextInput,
  TextArea
} from "grommet";
import { Trash } from "grommet-icons";

const MEASUREMENT_UNITS = ["grams", "kilograms", "liters", "mililiters"];

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
      name: "",
      description: "",
      ingredients: [{ name: "", quantity: undefined, measurementUnit: undefined }]
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
            name="name"
            onChange={handleInputChange()}
            placeholder="Name"
            value={state.name}
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
        <Grid a11yTitle="Ingredients list" rows="auto" gap="medium" mrgin="medium">
          {state.ingredients.map((ingredient, index) => {
            const handleIngredientInputChange = handleInputChange({
              type: "modifyIngredient",
              listElementId: index
            });

            return (
              <ResponsiveContext.Consumer>
                {size => (
                  <Grid
                    a11yTitle={`Ingredient number ${index}`}
                    columns={size === "small" ? "auto" : "small"}
                    rows={size === "small" ? "xxsmall" : "xxsmall"}
                    gap="small"
                    key={ingredient.id || "new-ingredient"}
                  >
                    <FormField required>
                      <TextInput
                        a11yTitle="Enter the name of the ingredient"
                        name="name"
                        onChange={handleIngredientInputChange}
                        placeholder="Name"
                        value={ingredient.name}
                      />
                    </FormField>
                    <FormField required>
                      <TextInput
                        a11yTitle="Enter the quantity"
                        name="quantity"
                        onChange={handleIngredientInputChange}
                        placeholder="Quantity"
                        type="number"
                        value={ingredient.quantity}
                      />
                    </FormField>
                    <FormField required>
                      <Select
                        a11yTitle="Select the measurement unit for this ingredient"
                        name="measurementUnit"
                        onChange={handleIngredientInputChange}
                        options={MEASUREMENT_UNITS}
                        placeholder="Measure"
                        value={ingredient.measurementUnit}
                      />
                    </FormField>

                    <Trash />
                  </Grid>
                )}
              </ResponsiveContext.Consumer>
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
