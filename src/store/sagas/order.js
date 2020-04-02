import { put } from 'redux-saga/effects';

import * as actions from '../actions';
import axios from '../../axios-orders';

export function* purchaseBurger(payload) {
  const { orderData, token } = payload;
  try {
    const response = axios.post(`/orders.json?auth=${token}`, orderData);
    yield put(actions.purchaseBurgerSuccess(response.data, orderData));
  } catch (error) {
    yield put(actions.purchaseBurgerFailed(error));
  }
}

export function* fetchOrders(payload) {
  const { token, userId } = payload;
  yield put(actions.fetchOrderStart());
  const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
  try {
    const response = axios.get(`/orders.json${queryParams}`);
    const dataFetch = [];
    for (let key in response.data) {
      dataFetch.push({
        ...response.data[key],
        id: key,
      });
    }
    yield put(actions.fetchOrderSuccess(dataFetch));
  } catch (error) {
    yield put(actions.fetchOrderfail(error));
  }
}
