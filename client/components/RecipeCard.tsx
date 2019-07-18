import { Box, Heading, Text } from "grommet";
import styled from "styled-components";

import Link from "./common/Link";

interface RecipeCardProps {
  description: string;
  id: string;
  title: string;
}

const RecipeCard: React.FunctionComponent<RecipeCardProps> = ({ description, id, title }) => {
  return (
    <Link href={`/recipe/${id}`}>
      <StyledBox background="ultralightGray" pad="small">
        <Heading a11yTitle={`Recipe titled ${title}`} level="4">
          {title}
        </Heading>

        <Text>{description}</Text>
      </StyledBox>
    </Link>
  );
};

const StyledBox = styled(Box)`
  box-shadow: 1px 1px 4px;

  :hover {
    transform: scale(1.01);
  }
`;

export default RecipeCard;
