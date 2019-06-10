import { WUNDERLIST_CLIENT_ID, WUNDERLIST_REDIRECT_URI, WUNDERLIST_RANDOM } from "../config";

function Home() {
  return (
    <div>
      <a
        href={`https://www.wunderlist.com/oauth/authorize?client_id=${WUNDERLIST_CLIENT_ID}&redirect_uri=${WUNDERLIST_REDIRECT_URI}&state=${WUNDERLIST_RANDOM}`}
      >
        Sign in with Wunderlist
      </a>
    </div>
  );
}

export default Home;
