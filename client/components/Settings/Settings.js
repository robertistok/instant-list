import { Box, Heading } from "grommet";

import Lists from "./Lists";

const Settings = () => {
  return (
    <Box as="section">
      <Heading a11yTitle="Page title" level={2}>
        Settings
      </Heading>

      <Lists />
    </Box>
  );
};

export default Settings;
