import { withRouter } from "next/router";
import { useQuery } from "react-apollo-hooks";
import gql from "graphql-tag";
import { Box, Button, Heading, Text } from "grommet";
import { Add } from "grommet-icons";

import Loader from "./common/Loader";

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
  const { data, loading } = useQuery(RECIPE_QUERY, {
    variables: { where: { id: router.query.id } }
  });

  if (loading) {
    return <Loader />;
  }

  const { recipe } = data;

  return (
    <div>
      <Heading level="2">{recipe.title}</Heading>
      <Text>{recipe.description}</Text>
      <Heading level="3">Steps</Heading>
      <Box as="ul" gap="medium">
        {recipe.steps.map((step, index) => (
          <Box align="start" direction="row" gap="small">
            <Heading className="info" level="4" margin="0">
              {`${index + 1}.`}
            </Heading>
            <Text key={step}>{step}</Text>
          </Box>
        ))}
      </Box>

      <Heading level="3">Ingredients</Heading>
      <Box gap="medium">
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
      </Box>
    </div>
  );
};

export default withRouter(Recipe);
