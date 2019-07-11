import PleaseSignIn from "../components/PleaseSignIn";
import Recipes from "../components/Recipes";

interface Props {}

const Home: React.FunctionComponent<Props> = () => {
  return (
    <PleaseSignIn>
      <Recipes />
    </PleaseSignIn>
  );
};

export default Home;
