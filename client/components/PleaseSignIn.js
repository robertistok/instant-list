import WunderlistAuth from "./WunderlistAuth";

import { useUser } from "../hooks/user";

const PleaseSignIn = props => {
  const { data, loading } = useUser();

  if (loading) return <p>Loading...</p>;

  if (!data.me) {
    return (
      <div>
        <p>Please Sign In before Continuing</p>
        <WunderlistAuth />
      </div>
    );
  }
  return props.children;
};

export default PleaseSignIn;
