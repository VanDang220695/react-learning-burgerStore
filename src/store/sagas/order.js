import { call, put } from 'redux-saga/effects';

import {
	purchaseBurgerService,
	fetchOrdersService,
} from '../../services/order';
import { getCookie } from '../../utils/cookies';
import { COOKIE_USER_ID, COOKIE_TOKEN } from '../../constants';
import * as actions from '../actions';

export function* purchaseBurger({ payload }) {
	const userId = yield getCookie(COOKIE_USER_ID);
	const token = yield getCookie(COOKIE_TOKEN);
	const params = {
		...payload,
		userId,
		token,
	};
	try {
		yield call(purchaseBurgerService, params);
		yield put(actions.initIngredients());
		yield put(fetchOrders({ token, userId }));
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
		yield put(actions.fetchOrderFail(error));
	}
}
