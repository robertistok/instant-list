/* eslint-disable no-alert */
import { useQuery } from "react-apollo-hooks";
import { animated } from "react-spring";
import gql from "graphql-tag";
import { Box, Button, Heading, Text } from "grommet";
import { Add } from "grommet-icons";

import Loader from "./common/Loader";
import RecipeLink from "./links/RecipeLink";

import { useListAnimation } from "../hooks/animations";

export const RECIPE_QUERY = gql`
  query RECIPE_QUERY($where: RecipeWhereUniqueInput!) {
    recipe(where: $where) {
      id
      description
      title
      steps
      ingredients {
        id
        quantity
        measurementUnit
        name
      }
      user {
        id
      }
    }
  }
`;

const Recipe = ({ router }) => {
  const { id: recipeId } = router.query;
  const {
    data: { recipe },
    loading
  } = useQuery(RECIPE_QUERY, {
    variables: { where: { id: recipeId } }
  });

  const ingredientsTrail = useListAnimation(recipe && recipe.ingredients.length);
  const stepsTrail = useListAnimation(recipe && recipe.steps.length);

  if (loading) {
    return <Loader />;
  }

  const handleDelete = () => {
    const confirmedResponse = window.confirm("Are you sure you want to delete this recipe?");
  };

  return (
    <div>
      <Heading level="2">{recipe.title}</Heading>

      <Text a11yTitle="Description">{recipe.description}</Text>

      <Heading level="3">Steps</Heading>
      <Box a11yTitle="Steps container" as="ul" gap="medium">
        {stepsTrail.map((style, index) => {
          const step = recipe.steps[index];
          const stepNumber = index + 1;
          return (
            <AnimatedBox
              a11yTitle={`Step number ${stepNumber}`}
              align="start"
              direction="row"
              gap="small"
              key={step}
              style={style}
            >
              <Heading className="info" level="4" margin="0">
                {`${index + 1}.`}
              </Heading>
              <Text a11yTitle={`Description for step number ${stepNumber}`} key={step}>
                {step}
              </Text>
            </AnimatedBox>
          );
        })}
      </Box>

      <Heading level="3">Ingredients</Heading>
      <Box a11yTitle="Ingredients container" gap="medium">
        {ingredientsTrail.map((props, index) => {
          const { id, name, measurementUnit, quantity } = recipe.ingredients[index];

          return (
            <AnimatedBox align="center" as="li" direction="row" gap="small" style={props} key={id}>
              <Button hoverIndicator icon={<Add />} plain />
              <Text key={id}>
                {`${quantity || ""} ${(measurementUnit && measurementUnit.toLowerCase()) || ""}
                    ${name}`}
              </Text>
            </AnimatedBox>
          );
        })}
      </Box>

      <Box a11yTitle="Recipe action buttons" direction="row" gap="medium" margin="40px 0px">
        <RecipeLink id={recipeId} path="/edit-recipe">
          <Button label="Edit" primary />
        </RecipeLink>
        <Button color="wunderlistRed" label="Delete" onClick={handleDelete} primary />
      </Box>
    </div>
  );
};

const AnimatedBox = animated(Box);

export default Recipe;
