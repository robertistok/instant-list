import { useEffect } from "react";
import { useQuery } from "react-apollo-hooks";
import gql from "graphql-tag";
import { Box, Heading } from "grommet";

export const USERS_PROJECTS_FROM_TODOIST_QUERY = gql`
  query USERS_PROJECTS_FROM_TODOIST_QUERY {
    usersProjectsFromTodoist {
      id
      name
    }
  }
`;

const Settings = () => {
  const { data } = useQuery(USERS_PROJECTS_FROM_TODOIST_QUERY);

  console.log(data);

  return (
    <Box as="section">
      <Heading a11yTitle="Page title" level={2}>
        Settings
      </Heading>
    </Box>
  );
};

export default Settings;
