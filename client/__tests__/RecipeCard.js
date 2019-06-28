import { shallow } from "enzyme";

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

  it("renders the <RecipeLink /> component with the proper id", () => {
    const wrapper = shallow(<RecipeCardComponent {...mockedRecipe} />);
    const RecipeLink = wrapper.find(`RecipeLink`);

    expect(RecipeLink.props()).toEqual(expect.objectContaining({ id: mockedRecipe.id }));
  });
});
