/* eslint-disable import/prefer-default-export */

import { useReducer } from "react";
import nanoid from "nanoid";

export const useUpsertRecipeState = recipe => {
  const defaultIngredientState = { name: "", quantity: null, measurementUnit: null };

  const initialState = {
    title: "",
    description: "",
    servings: null,
    steps: [""],
    ingredients: [{ id: nanoid(), ...defaultIngredientState }]
  };

  const reducer = (state, { type, payload }) => {
    switch (type) {
      case "updateState": {
        const { name, value } = payload;
        return { ...state, [name]: value };
      }
      case "updateIngredient": {
        const { value, listElementId, name } = payload;
        return {
          ...state,
          ingredients: state.ingredients.map(ingredient =>
            ingredient.id === listElementId ? { ...ingredient, [name]: value } : ingredient
          )
        };
      }
      case "updateStep": {
        const { value, listElementId } = payload;
        return {
          ...state,
          steps: state.steps.map((step, index) => (index === listElementId ? value : step))
        };
      }
      case "addIngredient": {
        return {
          ...state,
          ingredients: [...state.ingredients, { id: nanoid(), ...defaultIngredientState }]
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
        console.log(payload);
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
    ...(!recipe && initialState),
    user: undefined
  });

  const addIngredient = () => {
    dispatch({ type: "addIngredient" });
  };

  const deleteIngredient = payload => {
    dispatch({ type: "deleteIngredient", payload });
  };

  const addStep = () => {
    dispatch({ type: "addStep" });
  };

  const deleteStep = payload => {
    dispatch({ type: "deleteStep", payload });
  };

  const updateState = payload => {
    dispatch({ type: "updateState", payload });
  };

  const updateIngredient = payload => {
    dispatch({ type: "updateIngredient", payload });
  };

  const updateStep = payload => {
    dispatch({ type: "updateStep", payload });
  };

  return [
    state,
    {
      addIngredient,
      addStep,
      deleteIngredient,
      deleteStep,
      updateState,
      updateIngredient,
      updateStep,
      dispatch
    }
  ];
};
