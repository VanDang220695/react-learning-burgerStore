import { put } from 'redux-saga/effects';

import configAxios from '../../utils/axios-orders';
import * as actions from '../actions';

const axios = configAxios();

export function* initIngredients() {
  try {
    const response = yield axios.get(
      'https://react-my-burger-85174.firebaseio.com/ingredients.json',
    );
    yield put(actions.setIngredients(response.data));
  } catch (error) {
    yield put(actions.fetchIngredientsFailed());
  }
}
