import { withRouter } from "next/router";

import EditRecipe from "../components/EditRecipe";
import PleaseSignIn from "../components/PleaseSignIn";

const EditRecipePage = ({ router }) => {
  return (
    <PleaseSignIn>
      <EditRecipe router={router} />
    </PleaseSignIn>
  );
};

export default withRouter(EditRecipePage);
