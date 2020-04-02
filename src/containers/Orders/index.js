import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order';
import Spinner from '../../components/UI/Spinner';

import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler';

import * as actions from '../../store/actions';

class Orders extends Component {
  componentDidMount() {
    const { token, userId } = this.props;
    this.props.onFetchOrders(token, userId);
  }
  render() {
    let orders = <Spinner />;
    if (!this.props.loading) {
      orders = (
        <div>
          {this.props.orders.map(order => (
            <Order key={order.id} ingredients={order.ingredients} price={order.price} />
          ))}
        </div>
      );
    }
    return orders;
  }
}

const mapStateToProps = state => ({
  orders: state.order.orders,
  loading: state.order.loading,
  token: state.auth.token,
  userId: state.auth.userId,
});

const mapDispatchToProps = dispatch => ({
  onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
