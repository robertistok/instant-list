import NewRecipe from "../components/NewRecipe";
import PleaseSignIn from "../components/PleaseSignIn";

const Home = () => {
  return (
    <PleaseSignIn>
      <NewRecipe />
    </PleaseSignIn>
  );
};

export default Home;
