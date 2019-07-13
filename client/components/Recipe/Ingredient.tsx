/* eslint-disable no-alert */
import gql from "graphql-tag";
import { Box, Button, Text } from "grommet";
import { Add } from "grommet-icons";
import { animated } from "react-spring";

import { useMutation } from "react-apollo-hooks";
import useUser from "../../hooks/user";
// import { useMutation } from "../../hooks/apolloHooksWrappers";

const CREATE_TODOIST_TASK_MUTATION = gql`
  mutation CREATE_TODOIST_TASK_MUTATION($data: CreateTodoistTaskInput!) {
    createTodoistTask(data: $data) {
      message
      status
    }
  }
`;

const formatMeasurementUnit = (mu: string): string => (mu ? mu.toLowerCase() : "");

interface Props {
  quantity: number;
  name: string;
  id: string;
  measurementUnit: string;
  style: any;
}

const Ingredient: React.FunctionComponent<Props> = ({
  quantity,
  name,
  id,
  measurementUnit,
  style,
}) => {
  const textToDisplay = `${quantity || ""} ${formatMeasurementUnit(measurementUnit)} ${name}`;

  const { data } = useUser();

  const createTodoistTask = useMutation(CREATE_TODOIST_TASK_MUTATION, {
    variables: { data: { content: textToDisplay, projectId: data.me.shoppingList.todoistId } },
  });

  const handleAddIngredient: void = () => {
    createTodoistTask();
  };

  return (
    <AnimatedBox align="center" as="li" direction="row" gap="small" style={style} key={id}>
      <Button hoverIndicator={true} icon={<Add />} onClick={handleAddIngredient} plain={true} />
      <Text key={id}>{textToDisplay}</Text>
    </AnimatedBox>
  );
};

const AnimatedBox = animated(Box);

export default Ingredient;
