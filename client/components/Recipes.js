import { useQuery } from "react-apollo-hooks";
import gql from "graphql-tag";
import { Box, Grid, Heading, ResponsiveContext } from "grommet";

import RecipeCard from "./RecipeCard";

import Loader from "./common/Loader";

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
    data: { ownRecipes = [] },
    loading
  } = useQuery(OWN_RECIPES_QUERY);

  if (loading) {
    return <Loader />;
  }

  return (
    <ResponsiveContext.Consumer>
      {size => {
        const isSmall = size === "small";
        return (
          <Box>
            <Heading a11yTitle="Recipes" level="2">
              Recipes
            </Heading>
            <Grid columns={isSmall ? "100%" : "400px"} gap="medium">
              {ownRecipes.map(recipe => (
                <RecipeCard key={recipe.id} {...recipe} />
              ))}
            </Grid>
          </Box>
        );
      }}
    </ResponsiveContext.Consumer>
  );
};

export default Recipes;
