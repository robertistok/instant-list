import { withRouter } from "next/router";

const Recipe = ({ router }) => {
  const { id } = router.query;
  return <div>recipe with id </div>;
};

export default withRouter(Recipe);
