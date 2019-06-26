/* eslint-disable no-alert */
import { useQuery } from "react-apollo-hooks";
import gql from "graphql-tag";
import { Box, Button, Heading, Text } from "grommet";
import { Add } from "grommet-icons";

import NewRecipe from "./NewRecipe";
import Loader from "./common/Loader";
import ForOhFor from "./common/ForOhFor";

import { RECIPE_QUERY } from "./Recipe";

const Recipe = ({ router }) => {
  const {
    data: { recipe },
    loading
  } = useQuery(RECIPE_QUERY, {
    variables: { where: { id: router.query.id } }
  });

  if (loading) {
    return <Loader />;
  }

  if (!recipe) {
    return <ForOhFor />;
  }

  return (
    <div>
      <NewRecipe recipe={recipe} />
    </div>
  );
};

export default Recipe;
