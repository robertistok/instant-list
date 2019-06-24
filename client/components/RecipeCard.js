import { Box, Heading, Text } from "grommet";

import RecipeLink from "./links/RecipeLink";

const RecipeCard = ({ description, id, title }) => {
  return (
    <RecipeLink id={id}>
      <Box background="ultralightGray" pad="small">
        <Heading a11yTitle={`Recipe titled ${title}`} level="4">
          {title}
        </Heading>

        <Text>{description}</Text>
      </Box>
    </RecipeLink>
  );
};

export default RecipeCard;
