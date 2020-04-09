import { call, put } from 'redux-saga/effects';

import { purchaseBurgerService, fetchOrdersService } from '../../services/order';
import { getCookie } from '../../utils/cookies';
import { COOKIE_USERID, COOKIE_TOKEN } from '../../constants';
import * as actions from '../actions';

export function* purchaseBurger({ payload }) {
  const token = yield getCookie(COOKIE_TOKEN);
  const userId = yield getCookie(COOKIE_USERID);
  const params = {
    ...payload,
    token,
    userId,
  };
  try {
    const response = yield call(purchaseBurgerService, params);
    yield put(actions.purchaseBurgerSuccess(response.data, params));
  } catch (error) {
    yield put(actions.purchaseBurgerFailed(error));
  }
}

export function* fetchOrders({ payload }) {
  yield put(actions.fetchOrderStart());
  try {
    const response = yield call(fetchOrdersService, payload);
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
