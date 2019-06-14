import { useUser } from "../hooks/user";

const Recipes = () => {
  const { data } = useUser();

  if (!data.me) {
    return null;
  }

  return (
    <div>
      Hello,
      <span>{data.me.name}</span>
    </div>
  );
};

export default Recipes;
