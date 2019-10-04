import { useEffect, useState } from "react";
import styled from "styled-components";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Box, Heading, Select } from "grommet";

import Loader from "../common/Loader";
import useUser, { queries } from "../../hooks/user";

import { TODOIST_COLORS } from "../../lib/constants";

export const USERS_PROJECTS_FROM_TODOIST_QUERY = gql`
  query USERS_PROJECTS_FROM_TODOIST_QUERY {
    usersProjectsFromTodoist {
      id
      name
      color
    }
  }
`;

export const ASSIGN_SHOPPING_LIST_TO_USER_MUTATION = gql`
  mutation ASSIGN_SHOPPING_LIST_TO_USER_MUTATION($projectId: Float!, $listType: LIST_TYPE!) {
    assignListToCurrentUser(projectId: $projectId, listType: $listType) {
      id
      shoppingList {
        id
        name
      }
    }
  }
`;

const Settings = () => {
  const {
    data: userProjectsFromTodoistQueryData = {},
    loading: userProjectsFromTodoistQueryLoading
  } = useQuery(USERS_PROJECTS_FROM_TODOIST_QUERY);
  const [assignListToCurrentUser] = useMutation(ASSIGN_SHOPPING_LIST_TO_USER_MUTATION, {
    refetchQueries: [{ query: queries.CURRENT_USER_QUERY }]
  });
  const { data, loading: currentUserQueryLoading } = useUser();

  const [shoppingList, setShoppingList] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const { me } = data;

    if (me && me.shoppingList && me.shoppingList.name) {
      setShoppingList(me.shoppingList);
      setLoading(false);
    }
  }, [data]);

  const handleSelectChange = event => {
    const selectedProjectId = Number(event.option.value);
    if (shoppingList.todoistId !== selectedProjectId) {
      assignListToCurrentUser({
        variables: { projectId: selectedProjectId, listType: "Shopping" }
      });
      setLoading(true);
    }
  };

  if (userProjectsFromTodoistQueryLoading || currentUserQueryLoading || loading) {
    return <Loader showMessage />;
  }

  const { usersProjectsFromTodoist = [] } = userProjectsFromTodoistQueryData;

  const selectOptions = usersProjectsFromTodoist.map(option => ({
    label: option.name,
    value: option.id,
    color: option.color
  }));

  return (
    <Box as="section">
      <Heading a11yTitle="Page title" level={4}>
        {data.me.shoppingList
          ? "Selected shopping list"
          : "Select your shopping list before moving forward"}
      </Heading>

      <Select
        a11yTitle="Shopping list selection"
        labelKey="label"
        valueKey="value"
        value={shoppingList.name}
        options={selectOptions}
        onChange={handleSelectChange}
        placeholder="Your project to save your shopping list"
      >
        {({ label, color }) => (
          <StyledOption
            direction="row"
            gap="xsmall"
            align="center"
            pad="xxsmall"
            projectColor={TODOIST_COLORS[color]}
          >
            {label}
          </StyledOption>
        )}
      </Select>
    </Box>
  );
};

const StyledOption = styled(Box)`
  &::before {
    content: "";
    background: ${({ projectColor }) => projectColor || "inherit"};
    border-radius: 50%;
    display: inline-block;
    height: 15px;
    margin-left: 4px;
    margin-right: 8px;
    width: 15px;
  }
`;

export default Settings;
