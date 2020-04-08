import { put } from 'redux-saga/effects';

import * as actions from '../actions';
import axiosConfig from '../../utils/axios-orders';

const axios = axiosConfig();
const token = localStorage.getItem('token');
const userId = localStorage.getItem('userId');

export function* purchaseBurger({ payload }) {
  const params = {
    ...payload,
    userId,
  };
  try {
    const response = axios.post(`/orders.json?auth=${token}`, params);
    yield put(actions.purchaseBurgerSuccess(response.data, params));
  } catch (error) {
    yield put(actions.purchaseBurgerFailed(error));
  }
}

export function* fetchOrders({ payload }) {
  const { token, userId } = payload;
  yield put(actions.fetchOrderStart());
  const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
  try {
    const response = yield axios.get(`/orders.json${queryParams}`);
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
