import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Skeleton } from 'antd';

import Order from '../../components/Order';

import configAxios from '../../utils/axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler';

import * as actions from '../../store/actions';

const axios = configAxios();

const Orders = (props) => {
  const { token, userId, onFetchOrders } = props;
  useEffect(() => {
    onFetchOrders({ token, userId });
  }, [token, userId, onFetchOrders]);

  return (
    <div style={{ margin: '0 auto', width: '80%' }}>
      <Skeleton loading={props.loading}>
        {props.orders.map((order) => (
          <Order
            id={order.id}
            key={order.id}
            ingredients={order.ingredients}
            price={order.price}
            createAt={order.createAt}
          />
        ))}
      </Skeleton>
    </div>
  );
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
