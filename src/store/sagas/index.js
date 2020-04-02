import { takeEvery, all, takeLatest } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import { logout, checkAuthTimeout, authUser, authCheckState } from './auth';
import { initIngredients } from './burgerBuilder';
import { purchaseBurger, fetchOrders } from './order';

export function* watchAuth() {
  yield all([
    takeEvery(actionTypes.AUTH_INITIAL_LOGOUT, logout),
    takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeout),
    takeEvery(actionTypes.AUTH_USER, authUser),
    takeEvery(actionTypes.AUTH_CHECK_INITIAL_STATE, authCheckState),
  ]);
}

export function* watchBurgerBuilder() {
  yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredients);
}

export function* watchOrder() {
  yield takeLatest(actionTypes.PURCHASE_BURGER, purchaseBurger);
  yield takeEvery(actionTypes.FETCH_ORDER, fetchOrders);
}
