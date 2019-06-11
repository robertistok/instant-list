import Recipes from "../components/Recipes";
import PleaseSignIn from "../components/PleaseSignIn";

const Home = () => {
  return (
    <PleaseSignIn>
      <Recipes />
    </PleaseSignIn>
  );
};

export default Home;
