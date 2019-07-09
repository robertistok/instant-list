import { shallow, mount } from "enzyme";
import toJSON from "enzyme-to-json";

import RecipeCardComponent from "../components/RecipeCard";

const mockedRecipe = { description: "Test description", id: 1, title: "Test title" };

describe("<RecipeCard />", () => {
  it("renders the title and description", () => {
    const wrapper = shallow(<RecipeCardComponent {...mockedRecipe} />);
    const TitleHeading = wrapper.find(`Heading`);
    expect(TitleHeading.children().text()).toBe(mockedRecipe.title);

    const Description = wrapper.find(`Text`);
    expect(Description.children().text()).toBe(mockedRecipe.description);
  });

  it("renders the <Link /> component with the proper href", () => {
    const wrapper = mount(<RecipeCardComponent {...mockedRecipe} />);

    expect(toJSON(wrapper.find("Link"))).toMatchSnapshot();
  });
});
