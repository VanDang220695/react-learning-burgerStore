import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order';
import Spinner from '../../components/UI/Spinner';

import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler';

import * as actions from '../../store/actions';

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders();
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
});

const mapDispatchToProps = dispatch => ({
  onFetchOrders: () => dispatch(actions.fetchOrders()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
