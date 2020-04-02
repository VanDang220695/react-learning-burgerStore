import * as actionTypes from './actionTypes';

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData,
  };
};

export const purchaseBurgerFailed = error => {
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

export const purchaseBurger = (orderData, token) => {
  return {
    type: actionTypes.PURCHASE_BURGER,
    payload: {
      orderData,
      token,
    },
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
};

export const fetchOrderSuccess = orders => {
  return {
    type: actionTypes.FETCH_ORDER_SUCCESS,
    orders,
  };
};

export const fetchOrderfail = errors => {
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

export const fetchOrders = (token, userId) => {
  return {
    type: actionTypes.FETCH_ORDER,
    payload: {
      token,
      userId,
    },
  };
};
