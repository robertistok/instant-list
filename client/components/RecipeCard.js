import { Box, Heading, Text } from "grommet";

import Link from "./common/Link";

const RecipeCard = ({ description, id, title }) => {
  return (
    <Link href={`/recipe/${id}`}>
      <Box background="ultralightGray" pad="small">
        <Heading a11yTitle={`Recipe titled ${title}`} level="4">
          {title}
        </Heading>

        <Text>{description}</Text>
      </Box>
    </Link>
  );
};

export default RecipeCard;
