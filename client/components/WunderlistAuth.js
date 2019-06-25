import { Button } from "grommet";
import { List } from "grommet-icons";

import { WUNDERLIST_CLIENT_ID, WUNDERLIST_REDIRECT_URI, WUNDERLIST_RANDOM } from "../config";

const WunderlistAuth = () => {
  return (
    <Button
      primary
      reverse
      label="Sign in with Wunderlist"
      icon={<List />}
      href={`https://www.wunderlist.com/oauth/authorize?client_id=${WUNDERLIST_CLIENT_ID}&redirect_uri=${WUNDERLIST_REDIRECT_URI}&state=${WUNDERLIST_RANDOM}`}
    />
  );
};

export default WunderlistAuth;
