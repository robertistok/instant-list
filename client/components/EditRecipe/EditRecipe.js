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
import StepCard from "./StepCard";

const EditRecipe = ({
  addIngredient,
  addStep,
  deleteIngredient,
  deleteStep,
  description,
  handleInputChange,
  handleSave,
  ingredients,
  servings,
  steps,
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
                type: "slideDown",
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

              <Heading a11yTitle="Steps" level="3">
                Steps
              </Heading>
              <Grid a11yTitle="Steps list" gap="medium" mrgin="medium">
                {steps.map((step, index) => {
                  const handleStepInputChange = handleInputChange({
                    type: "modifyStep",
                    listElementId: index
                  });

                  return (
                    <StepCard
                      addStep={addStep}
                      deleteStep={deleteStep(index)}
                      handleInputChange={handleStepInputChange}
                      index={index}
                      isFirstStep={index === 0}
                      isLastStep={index + 1 === steps.length}
                      // eslint-disable-next-line react/no-array-index-key
                      key={index}
                    />
                  );
                })}
              </Grid>

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
                      handleInputChange={handleIngredientInputChange}
                      index={index}
                      isFirstIngredient={index === 0}
                      isLastIngredient={index + 1 === ingredients.length}
                      key={ingredient.id}
                      name={ingredient.name}
                      measurementUnit={ingredient.measurementUnit}
                      quantity={ingredient.quantity}
                    />
                  );
                })}
              </Grid>

              <Button
                a11yTitle="Save recipe"
                alignSelf="start"
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
