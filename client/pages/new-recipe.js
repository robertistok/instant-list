import NewRecipe from "../components/NewRecipe";
import PleaseSignIn from "../components/PleaseSignIn";

const NewRecipePage = () => {
  return (
    <PleaseSignIn>
      <NewRecipe />
    </PleaseSignIn>
  );
};

export default NewRecipePage;
