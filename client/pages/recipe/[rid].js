import { useRouter } from "next/router";

import Recipe from "../../components/Recipe/Recipe";
import PleaseSignIn from "../../components/PleaseSignIn";

const RecipePage = () => {
  const router = useRouter();
  const { rid } = router.query;

  return (
    <PleaseSignIn>
      <Recipe id={rid} />
    </PleaseSignIn>
  );
};

export default RecipePage;
