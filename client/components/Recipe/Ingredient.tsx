/* eslint-disable no-alert */
import gql from "graphql-tag";
import { Box, Button, Text } from "grommet";
import { useMutation } from "@apollo/react-hooks";
import { Add, InProgress } from "grommet-icons";
import { animated } from "react-spring";

import Loader from "../common/Loader";
import useUser from "../../hooks/user";
import { abbrString } from "../../lib/utils";

const CREATE_TODOIST_TASK_MUTATION = gql`
  mutation CREATE_TODOIST_TASK_MUTATION($data: CreateTodoistTaskInput!) {
    createTodoistTask(data: $data) {
      message
      status
    }
  }
`;

const formatMeasurementUnit = (mu: string): string => (mu ? mu.toLowerCase() : "");

interface IngredientProps {
  quantity: number;
  name: string;
  id: string;
  measurementUnit: string;
  style: any;
  recipeTitle: string;
}

const Ingredient: React.FunctionComponent<IngredientProps> = ({
  quantity,
  name,
  id,
  measurementUnit,
  style,
  recipeTitle
}): React.ReactElement => {
  const textToDisplay = `${quantity || ""} ${formatMeasurementUnit(measurementUnit)} ${name}`;

  const { data } = useUser();

  const [createTodoistTask, { loading }] = useMutation(CREATE_TODOIST_TASK_MUTATION, {
    variables: {
      data: {
        content: `${textToDisplay} - ${abbrString(recipeTitle)}`,
        projectId: data.me.shoppingList.todoistId
      }
    }
  });

  const handleAddIngredient = (): void => {
    createTodoistTask();
  };

  return (
    <>
      {loading && <Loader />}
      <AnimatedBox align="center" as="li" direction="row" gap="small" style={style} key={id}>
        <Button
          disabled={loading}
          hoverIndicator={true}
          icon={loading ? <InProgress /> : <Add />}
          onClick={handleAddIngredient}
          plain={true}
        />
        <Text key={id}>{textToDisplay}</Text>
      </AnimatedBox>
    </>
  );
};

const AnimatedBox = animated(Box);

export default Ingredient;
