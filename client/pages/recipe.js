import { withRouter } from "next/router";

import Recipe from "../components/Recipe/Recipe";
import PleaseSignIn from "../components/PleaseSignIn";

const RecipePage = ({ router }) => {
  return (
    <PleaseSignIn>
      <Recipe router={router} />
    </PleaseSignIn>
  );
};

export default withRouter(RecipePage);
