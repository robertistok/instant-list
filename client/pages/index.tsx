import Router, { useRouter } from "next/router";

import PleaseSignIn from "../components/PleaseSignIn";
import Recipes from "../components/Recipes";

import useUser from "../hooks/user";

interface Props {}

const Home: React.FunctionComponent<Props> = (): React.ReactElement => {
  const { data } = useUser();

  if (data.me && !data.me.shoppingList) {
    alert("You must select a shopping list before continuing");
    Router.push("/settings");
    return null;
  }

  return (
    <PleaseSignIn>
      <Recipes />
    </PleaseSignIn>
  );
};

export default Home;
