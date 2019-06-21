import { Box, Heading, Text } from "grommet";

import RecipeLink from "./links/RecipeLink";

const RecipeCard = ({ description, id, title }) => {
  return (
    <Box background="ultralightGray" pad="small">
      <RecipeLink id={id}>
        <Heading a11yTitle={`Recipe titled ${title}`} level="4">
          {title}
        </Heading>
      </RecipeLink>

      <Text>{description}</Text>
    </Box>
  );
};

export default RecipeCard;
