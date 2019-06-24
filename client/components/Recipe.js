import { withRouter } from "next/router";
import { useQuery } from "react-apollo-hooks";
import { animated } from "react-spring";
import gql from "graphql-tag";
import { Box, Button, Heading, Text } from "grommet";
import { Add } from "grommet-icons";

import Loader from "./common/Loader";

import { useListAnimation } from "../hooks/animations";

const RECIPE_QUERY = gql`
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
        ingredient {
          name
        }
      }
      user {
        id
      }
    }
  }
`;

const Recipe = ({ router }) => {
  const {
    data: { recipe },
    loading
  } = useQuery(RECIPE_QUERY, {
    variables: { where: { id: router.query.id } }
  });

  const ingredientsTrail = useListAnimation(recipe && recipe.ingredients.length);
  const stepsTrail = useListAnimation(recipe && recipe.steps.length);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <Heading level="2">{recipe.title}</Heading>
      <Text>{recipe.description}</Text>
      <Heading level="3">Steps</Heading>
      <Box as="ul" gap="medium">
        {stepsTrail.map((style, index) => {
          const step = recipe.steps[index];
          return (
            <AnimatedBox align="start" direction="row" gap="small" key={step} style={style}>
              <Heading className="info" level="4" margin="0">
                {`${index + 1}.`}
              </Heading>
              <Text key={step}>{step}</Text>
            </AnimatedBox>
          );
        })}
      </Box>

      <Heading level="3">Ingredients</Heading>
      {/* <Box gap="medium">
        {recipe.ingredients.map(ingredient => (
          <Box align="center" as="li" direction="row" gap="small">
            <Button hoverIndicator icon={<Add />} plain />
            <Text key={ingredient.id}>
              {`${ingredient.quantity || ""} ${(ingredient.measurementUnit &&
                ingredient.measurementUnit.toLowerCase()) ||
                ""}
                    ${ingredient.ingredient.name}`}
            </Text>
          </Box>
        ))}
      </Box> */}

      <Box gap="medium">
        {ingredientsTrail.map((props, index) => {
          const { id, ingredient, measurementUnit, quantity } = recipe.ingredients[index];

          return (
            <AnimatedBox align="center" as="li" direction="row" gap="small" style={props} key={id}>
              <Button hoverIndicator icon={<Add />} plain />
              <Text key={id}>
                {`${quantity || ""} ${(measurementUnit && measurementUnit.toLowerCase()) || ""}
                    ${ingredient.name}`}
              </Text>
            </AnimatedBox>
          );
        })}
      </Box>
    </div>
  );
};

const AnimatedBox = animated(Box);

export default withRouter(Recipe);
