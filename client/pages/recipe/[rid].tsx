import { BaseRouter } from "next-server/dist/lib/router/router";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";

import PleaseSignIn from "../../components/PleaseSignIn";
import Recipe from "../../components/Recipe/Recipe";

interface Props {}

const RecipePage: React.FunctionComponent<Props> = () => {
  const router: BaseRouter = useRouter();
  const { rid }: { rid?: string } = router.query;

  return (
    <PleaseSignIn>
      <Recipe id={rid} />
    </PleaseSignIn>
  );
};

export default RecipePage;
