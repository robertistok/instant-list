import { useRouter } from "next/router";

import EditRecipe from "../../components/EditRecipe";
import PleaseSignIn from "../../components/PleaseSignIn";

const EditRecipePage = () => {
  const router = useRouter();
  const { rid } = router.query;

  return (
    <PleaseSignIn>
      <EditRecipe id={rid} />
    </PleaseSignIn>
  );
};

export default EditRecipePage;
