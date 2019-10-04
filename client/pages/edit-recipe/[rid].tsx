import { useRouter, NextRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";

import EditRecipe from "../../components/EditRecipe";
import PleaseSignIn from "../../components/PleaseSignIn";

interface Props {}

const EditRecipePage: React.FunctionComponent<Props> = (): React.ReactElement => {
  const router: NextRouter = useRouter();
  const { rid }: ParsedUrlQuery = router.query;

  return (
    <PleaseSignIn>
      <EditRecipe id={rid} />
    </PleaseSignIn>
  );
};

export default EditRecipePage;
