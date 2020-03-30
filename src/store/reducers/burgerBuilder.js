import * as actionType from '../actions/actionTypes';

import { updateObject } from '../../shared/utility';

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false,
};

const INGREDIENT_PRICE = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const addIngredient = (state, action) => {
  const updateIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
  };
  const updateIngredients = updateObject(state.ingredients, updateIngredient);
  const updateState = {
    ingredients: updateIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName],
    building: true,
  };
  return updateObject(state, updateState);
};

const removeIngredient = (state, action) => {
  const updateIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
  };
  const updateIngredients = updateObject(state.ingredients, updateIngredient);
  const updateState = {
    ingredients: updateIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName],
    building: true,
  };
  return updateObject(state, updateState);
};

const setIngredient = (state, action) => {
  return updateObject(state, {
    ingredients: {
      salad: action.ingredients.salad,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat,
    },
    error: false,
    totalPrice: initialState.totalPrice,
    building: false,
  });
};

const fetchIngredient = state => {
  return updateObject(state, { error: true });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ADD_INGREDIENT:
      return addIngredient(state, action);
    case actionType.REMOVE_INGREDIENT:
      return removeIngredient(state, action);
    case actionType.SET_INGREDIENTS:
      return setIngredient(state, action);
    case actionType.FETCH_INGREDIENTS_FAILED:
      return fetchIngredient(state);
    default:
      return state;
  }
};

export default reducer;
