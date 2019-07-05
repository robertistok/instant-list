import { useEffect } from "react";
import styled from "styled-components";
import { useQuery, useMutation } from "react-apollo-hooks";
import gql from "graphql-tag";
import { Box, Heading, Select } from "grommet";

import Loader from "../common/Loader";

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

export const USER_WITH_SHOPPINGLIST_QUERY = gql`
  query USER_SETTINGS_QUERY {
    me {
      id
      shoppingList {
        id
        name
      }
    }
  }
`;

export const ASSIGN_SHOPPING_LIST_TO_USER_MUTATION = gql`
  mutation ASSIGN_SHOPPING_LIST_TO_USER_MUTATION($projectId: Float!, $listType: LIST_TYPE!) {
    assignListToCurrentUser(projectId: $projectId, listType: $listType) {
      id
    }
  }
`;

const Settings = () => {
  const {
    data: userProjectsFromTodoistQueryData = {},
    loading: userProjectsFromTodoistQueryLoading
  } = useQuery(USERS_PROJECTS_FROM_TODOIST_QUERY);
  // const { data, loading: userWithShoppingListQueryLoading } = useQuery(USER_WITH_SHOPPINGLIST_QUERY);
  const assignListToCurrentUser = useMutation(ASSIGN_SHOPPING_LIST_TO_USER_MUTATION);

  const handleSelectChange = event => {
    assignListToCurrentUser({
      variables: { projectId: Number(event.option.value), listType: "Shopping" }
    });
  };

  if (userProjectsFromTodoistQueryLoading) {
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
        Select the project you&apos;d like to save your shopping list
      </Heading>

      <Select
        labelKey="label"
        valueKey="value"
        options={selectOptions}
        onChange={handleSelectChange}
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
