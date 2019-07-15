/* eslint-disable no-alert */
import { useQuery, useMutation } from "react-apollo-hooks";
import styled from "styled-components";
import Router from "next/router";
import { animated } from "react-spring";
import gql from "graphql-tag";
import { Box, Button, Heading, Text } from "grommet";

import Ingredient from "./Ingredient";
import Loader from "../common/Loader";
import ForOhFor from "../common/ForOhFor";
import Link from "../common/Link";

import { OWN_RECIPES_QUERY } from "../Recipes";
import { useListAnimation } from "../../hooks/animations";

export const RECIPE_QUERY = gql`
  query RECIPE_QUERY($where: RecipeWhereUniqueInput!) {
    recipe(where: $where) {
      id
      description
      title
      steps
      servings
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

export const DELETE_RECIPE_MUTATION = gql`
  mutation DELETE_RECIPE_MUTATIOn($where: RecipeWhereUniqueInput!) {
    deleteRecipe(where: $where) {
      id
    }
  }
`;

interface Props {
  id: string;
}

const Recipe: React.FunctionComponent<Props> = ({ id }) => {
  const {
    data: { recipe },
    loading
  } = useQuery(RECIPE_QUERY, {
    variables: { where: { id } }
  });
  const deleteRecipe = useMutation(DELETE_RECIPE_MUTATION, {
    variables: { where: { id } },
    update: () => Router.push("/"),
    refetchQueries: [{ query: OWN_RECIPES_QUERY }],
    awaitRefetchQueries: true
  });

  const ingredientsTrail = useListAnimation(recipe && recipe.ingredients.length);
  const stepsTrail = useListAnimation(recipe && recipe.steps.length);

  if (loading) {
    return <Loader />;
  }

  if (!recipe) {
    return <ForOhFor message="Recipe not found..." />;
  }

  const handleDelete = (): void => {
    const confirmedResponse: boolean = window.confirm(
      "Are you sure you want to delete this recipe?"
    );

    if (confirmedResponse) {
      deleteRecipe();
    }
  };

  return (
    <Root>
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
        {ingredientsTrail.map((style, index) => (
          <Ingredient
            key={recipe.ingredients[index].id}
            style={style}
            {...recipe.ingredients[index]}
          />
        ))}
      </Box>

      <Box a11yTitle="Recipe action buttons" direction="row" gap="medium" margin="40px 0px">
        <Link href={`/edit-recipe/${id}`}>
          <Button label="Edit" primary />
        </Link>
        <Button color="todoistRed" label="Delete" onClick={handleDelete} />
      </Box>
    </Root>
  );
};

const Root = styled(Box)`
  max-width: 768px;
  margin: auto;
`;

const AnimatedBox = animated(Box);

export default Recipe;
