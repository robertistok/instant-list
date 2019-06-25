/* eslint-disable import/prefer-default-export */

import { useReducer } from "react";

const getIngredientId = () => `new-${new Date().getTime()}`;

export const useUpsertRecipeState = props => {
  const recipe = props;

  const defaultIngredientState = { name: "", quantity: undefined, measurementUnit: undefined };

  const initialState = {
    title: "",
    description: "",
    servings: undefined,
    steps: [""],
    ingredients: [{ id: getIngredientId(), ...defaultIngredientState }]
  };

  const reducer = (state, { type, payload }) => {
    switch (type) {
      case "textInput": {
        const { name, value } = payload.event.target;
        return { ...state, [name]: (!Number.isNaN(value) && Number(value)) || value };
      }
      case "modifyIngredient": {
        const { option, target } = payload.event;
        const nameWithoutIndex = target.name.split("-")[0];
        return {
          ...state,
          ingredients: state.ingredients.map(ingredient =>
            ingredient.id === payload.listElementId
              ? {
                  ...ingredient,
                  [nameWithoutIndex]:
                    option || (!Number.isNaN(target.value) && Number(target.value)) || target.value
                }
              : ingredient
          )
        };
      }
      case "modifyStep": {
        const { target } = payload.event;
        return {
          ...state,
          steps: state.steps.map((ingredient, index) =>
            index === payload.listElementId ? target.value : ingredient
          )
        };
      }
      case "addIngredient": {
        return {
          ...state,
          ingredients: [...state.ingredients, { id: getIngredientId(), ...defaultIngredientState }]
        };
      }
      case "deleteIngredient": {
        return {
          ...state,
          ingredients: state.ingredients.filter(
            ingredient => ingredient.id !== payload.listElementId
          )
        };
      }
      case "addStep": {
        return {
          ...state,
          steps: [...state.steps, ""]
        };
      }
      case "deleteStep": {
        return {
          ...state,
          steps: state.steps.filter((ingredient, index) => index !== payload.listElementId)
        };
      }
      default:
        throw new Error();
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    ...recipe,
    ...(!recipe && initialState)
  });

  return [state, dispatch];
};
