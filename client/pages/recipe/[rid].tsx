import { NextRouter, useRouter } from "next/router";

import PleaseSignIn from "../../components/PleaseSignIn";
import Recipe from "../../components/Recipe/Recipe";

interface Props {}

const RecipePage: React.FunctionComponent<Props> = (): React.ReactElement => {
  const router: NextRouter = useRouter();
  const { rid }: { rid?: string } = router.query;

  return (
    <PleaseSignIn>
      <Recipe id={rid} />
    </PleaseSignIn>
  );
};

export default RecipePage;
