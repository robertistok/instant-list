import { useQuery } from "react-apollo-hooks";
import gql from "graphql-tag";
import { Box, Grid, Heading } from "grommet";

import RecipeCard from "./RecipeCard";

const OWN_RECIPES_QUERY = gql`
  query OWN_RECIPES_QUERY {
    ownRecipes {
      id
      title
      description
    }
  }
`;

const Recipes = () => {
  const {
    data: { ownRecipes = [] }
  } = useQuery(OWN_RECIPES_QUERY);

  return (
    <Box>
      <Heading a11yTitle="Recipes" level="2">
        Recipes
      </Heading>
      <Grid columns="400px">
        {ownRecipes.map(recipe => (
          <RecipeCard key={recipe.id} {...recipe} />
        ))}
      </Grid>
    </Box>
  );
};

export default Recipes;
