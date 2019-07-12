import { BaseRouter } from "next-server/dist/lib/router/router";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";

import EditRecipe from "../../components/EditRecipe";
import PleaseSignIn from "../../components/PleaseSignIn";

interface Props {}

const EditRecipePage: React.FunctionComponent<Props> = () => {
  const router: BaseRouter = useRouter();
  const { rid }: ParsedUrlQuery = router.query;

  return (
    <PleaseSignIn>
      <EditRecipe id={rid} />
    </PleaseSignIn>
  );
};

export default EditRecipePage;
