import Recipe from "../components/Recipe";
import PleaseSignIn from "../components/PleaseSignIn";

const RecipePage = () => {
  return (
    <PleaseSignIn>
      <Recipe />
    </PleaseSignIn>
  );
};

export default RecipePage;
