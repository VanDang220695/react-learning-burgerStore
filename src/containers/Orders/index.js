import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order';
import Spinner from '../../components/UI/Spinner';

import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler';

import * as actions from '../../store/actions';

const Orders = (props) => {
  const { token, userId, onFetchOrders } = props;
  useEffect(() => {
    onFetchOrders({ token, userId });
  }, [token, userId, onFetchOrders]);
  let orders = <Spinner />;
  if (!props.loading) {
    orders = (
      <div>
        {props.orders.map((order) => (
          <Order key={order.id} ingredients={order.ingredients} price={order.price} />
        ))}
      </div>
    );
  }
  return orders;
};

const mapStateToProps = (state) => ({
  orders: state.order.orders,
  loading: state.order.loading,
  token: state.auth.token,
  userId: state.auth.userId,
});

const mapDispatchToProps = (dispatch) => ({
  onFetchOrders: (payload) => dispatch(actions.fetchOrders(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
