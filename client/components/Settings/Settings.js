import { useEffect } from "react";
import { useQuery } from "react-apollo-hooks";
import gql from "graphql-tag";
import { Box, Heading, Select } from "grommet";

import Loader from "../common/Loader";

export const USERS_PROJECTS_FROM_TODOIST_QUERY = gql`
  query USERS_PROJECTS_FROM_TODOIST_QUERY {
    usersProjectsFromTodoist {
      id
      name
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

const Settings = () => {
  const { data, loading } = useQuery(USERS_PROJECTS_FROM_TODOIST_QUERY);
  // const { data, loading: userWithShoppingListQueryLoading } = useQuery(USER_WITH_SHOPPINGLIST_QUERY);

  console.log(data);

  if (loading) {
    return <Loader showMessage />;
  }

  const { usersProjectsFromTodoist } = data;

  const selectOptions = usersProjectsFromTodoist.map(option => ({
    label: option.name,
    value: option.id
  }));

  console.log(selectOptions);

  return (
    <Box as="section">
      <Heading a11yTitle="Page title" level={2}>
        Settings
      </Heading>

      <Heading a11yTitle="Page title" level={4}>
        Select your shopping list
      </Heading>

      <Select labelKey="label" valueKey="value" options={selectOptions} />
    </Box>
  );
};

export default Settings;
