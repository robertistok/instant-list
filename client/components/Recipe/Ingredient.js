/* eslint-disable no-alert */
import { Box, Button, Text } from "grommet";
import { Add } from "grommet-icons";
import { animated } from "react-spring";
import { useMutation } from "react-apollo-hooks";
import gql from "graphql-tag";

import useUser from "../../hooks/user";

const CREATE_TODOIST_TASK_MUTATION = gql`
  mutation CREATE_TODOIST_TASK_MUTATION($data: CreateTodoistTaskInput!) {
    createTodoistTask(data: $data) {
      message
      status
    }
  }
`;

const formatMeasurementUnit = mu => (mu ? mu.toLowerCase() : "");

const Ingredient = ({ quantity, name, id, measurementUnit, style }) => {
  const textToDisplay = `${quantity || ""} ${formatMeasurementUnit(measurementUnit)} ${name}`;

  const { data } = useUser();

  const createTodoistTask = useMutation(CREATE_TODOIST_TASK_MUTATION, {
    variables: { data: { content: textToDisplay, projectId: data.me.shoppingList.todoistId } }
  });

  const handleAddIngredient = () => {
    createTodoistTask();
  };

  return (
    <AnimatedBox align="center" as="li" direction="row" gap="small" style={style} key={id}>
      <Button hoverIndicator icon={<Add />} onClick={handleAddIngredient} plain />
      <Text key={id}>{textToDisplay}</Text>
    </AnimatedBox>
  );
};

const AnimatedBox = animated(Box);

export default Ingredient;
