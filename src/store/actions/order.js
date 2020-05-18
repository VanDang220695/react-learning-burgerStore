import * as actionTypes from './actionTypes';

export const purchaseBurgerSuccess = (payload) => {
	return {
		type: actionTypes.PURCHASE_BURGER_SUCCESS,
		payload,
	};
};

export const purchaseBurgerFailed = (error) => {
	return {
		type: actionTypes.PURCHASE_BURGER_FAILED,
		error,
	};
};

export const purchaseBurgerStart = () => {
	return {
		type: actionTypes.PURCHASE_BURGER_START,
	};
};

export const purchaseBurger = (payload) => {
	return {
		type: actionTypes.PURCHASE_BURGER,
		payload,
	};
};

export const purchaseInit = () => {
	return {
		type: actionTypes.PURCHASE_INIT,
	};
};

export const fetchOrderSuccess = (orders) => {
	return {
		type: actionTypes.FETCH_ORDER_SUCCESS,
		orders,
	};
};

export const fetchOrderFail = (errors) => {
	return {
		type: actionTypes.FETCH_ORDER_FAILED,
		errors,
	};
};

export const fetchOrderStart = () => {
	return {
		type: actionTypes.FETCH_ORDER_START,
	};
};

export const fetchOrders = (payload) => {
	return {
		type: actionTypes.FETCH_ORDER,
		payload,
	};
};
