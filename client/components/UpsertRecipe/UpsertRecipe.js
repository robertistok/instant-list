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

const UpsertRecipe = ({
  addIngredient,
  addStep,
  deleteIngredient,
  deleteStep,
  handleUpdateState,
  handleUpdateStep,
  handleUpdateIngredient,
  handleSave,
  isEditComponent,
  recipe
}) => {
  const { description, ingredients, servings = "", steps } = recipe;
  const componentTitle = isEditComponent ? "Edit your recipe" : "Create new recipe";

  return (
    <ResponsiveContext.Consumer>
      {size => {
        const isSmall = ["small"].includes(size);

        return (
          <>
            <Heading a11yTitle={componentTitle} level="2">
              {componentTitle}
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
                  onChange={handleUpdateState}
                  placeholder="Title"
                  required
                  value={recipe.title}
                />

                <FormField
                  a11yTitle="Number of servings"
                  component={TextInput}
                  name="servings"
                  onChange={handleUpdateState}
                  placeholder="Servings"
                  type="number"
                  value={servings}
                />
              </Grid>

              <FormField
                a11yTitle="Description for your new recipe"
                component={TextArea}
                name="description"
                onChange={handleUpdateState}
                placeholder="Description"
                required
                value={description}
              />

              <Heading a11yTitle="Steps" level="3">
                Steps
              </Heading>
              <Grid a11yTitle="Steps list" gap="medium" mrgin="medium">
                {steps.map((step, index) => (
                  <StepCard
                    addStep={addStep}
                    deleteStep={deleteStep(index)}
                    description={step}
                    handleInputChange={handleUpdateStep(index)}
                    index={index}
                    isFirstStep={index === 0}
                    isLastStep={index + 1 === steps.length}
                    // eslint-disable-next-line react/no-array-index-key
                    key={`new-step-${index}`}
                    stepNumber={index + 1}
                    totalSteps={steps.length}
                  />
                ))}
              </Grid>

              <Heading a11yTitle="Ingredients" level="3">
                Ingredients
              </Heading>
              <Grid a11yTitle="Ingredients list" gap="medium" mrgin="medium">
                {ingredients.map((ingredient, index) => {
                  return (
                    <IngredientCard
                      addIngredient={addIngredient}
                      deleteIngredient={deleteIngredient(ingredient.id)}
                      handleInputChange={handleUpdateIngredient(ingredient.id)}
                      index={index}
                      isFirstIngredient={index === 0}
                      ingredientNumber={index + 1}
                      isLastIngredient={index + 1 === ingredients.length}
                      key={ingredient.id}
                      {...ingredient}
                    />
                  );
                })}
              </Grid>

              <Button
                a11yTitle={isEditComponent ? "Save recipe" : "Create recipe"}
                alignSelf="start"
                label={isEditComponent ? "Save" : "Create"}
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

export default UpsertRecipe;
