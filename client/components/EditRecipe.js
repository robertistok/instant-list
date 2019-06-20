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

import IngredientCard from "./IngredientCard";

const EditRecipe = ({
  addIngredient,
  deleteIngredient,
  description,
  handleInputChange,
  handleSave,
  ingredients,
  servings,
  title
}) => {
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
              <Grid columns={isSmall ? "auto" : ["40%", "18%"]} gap={isSmall ? "small" : "large"}>
                <FormField
                  a11yTitle="Title for your new recipe"
                  component={TextInput}
                  name="title"
                  onChange={handleInputChange()}
                  placeholder="Title"
                  required
                  value={title}
                />

                <FormField
                  a11yTitle="Number of servings"
                  component={TextInput}
                  name="servings"
                  onChange={handleInputChange()}
                  placeholder="Servings"
                  type="number"
                  value={servings}
                />
              </Grid>

              <FormField
                a11yTitle="Description for your new recipe"
                component={TextArea}
                name="description"
                onChange={handleInputChange()}
                placeholder="Description"
                required
                value={description}
              />

              <Heading a11yTitle="Ingredients" level="3">
                Ingredients
              </Heading>
              <Grid a11yTitle="Ingredients list" gap="medium" mrgin="medium">
                {ingredients.map((ingredient, index) => {
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
                      isLastIngredient={index + 1 === ingredients.length}
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

export default EditRecipe;
