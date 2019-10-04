import NewRecipe from "../components/NewRecipe";
import PleaseSignIn from "../components/PleaseSignIn";

interface Props {}

const NewRecipePage: React.FunctionComponent<Props> = (): React.ReactElement => {
  return (
    <PleaseSignIn>
      <NewRecipe />
    </PleaseSignIn>
  );
};

export default NewRecipePage;
