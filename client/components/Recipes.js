import { useUser } from "../hooks/user";

const Recipes = () => {
  const { data } = useUser();

  return (
    <div>
      Hello,
      <span>{data.me.name}</span>
    </div>
  );
};

export default Recipes;
