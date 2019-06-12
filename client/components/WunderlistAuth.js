import { Button } from "antd";

import { WUNDERLIST_CLIENT_ID, WUNDERLIST_REDIRECT_URI, WUNDERLIST_RANDOM } from "../config";

const WunderlistAuth = () => {
  return (
    <div>
      <Button
        type="primary"
        icon="unordered-list"
        href={`https://www.wunderlist.com/oauth/authorize?client_id=${WUNDERLIST_CLIENT_ID}&redirect_uri=${WUNDERLIST_REDIRECT_URI}&state=${WUNDERLIST_RANDOM}`}
      >
        Sign in with Wunderlist
      </Button>
    </div>
  );
};

export default WunderlistAuth;
