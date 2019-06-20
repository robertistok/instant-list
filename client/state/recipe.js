/* eslint-disable import/prefer-default-export */

import { useReducer } from "react";

export const useUpsertRecipeState = props => {
  const recipe = props;

  const defaultIngredientState = { name: "", quantity: undefined, measurementUnit: undefined };

  const initialState = {
    title: "",
    description: "",
    servings: undefined,
    ingredients: [{ id: new Date().getTime(), ...defaultIngredientState }]
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
      case "addIngredient": {
        return {
          ...state,
          ingredients: [
            ...state.ingredients,
            { id: new Date().getTime(), ...defaultIngredientState }
          ]
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
