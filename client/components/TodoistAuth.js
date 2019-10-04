import getConfig from "next/config";
import { Button } from "grommet";
import { List } from "grommet-icons";

const {
  publicRuntimeConfig: { TODOIST_CLIENT_ID, TODOIST_RANDOM }
} = getConfig();

const TodoistAuth = () => {
  return (
    <Button
      primary
      reverse
      label="Sign in with Todosit"
      icon={<List />}
      href={`https://todoist.com/oauth/authorize?client_id=${TODOIST_CLIENT_ID}&scope=data:read_write,data:delete&state=${TODOIST_RANDOM}`}
    />
  );
};

export default TodoistAuth;
