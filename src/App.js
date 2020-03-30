import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import asyncComponent from './hoc/asyncComponent';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout';

import * as actions from './store/actions';

const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout');
});
const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders');
});

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth');
});

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <React.Fragment>
        <Route path='/auth' component={asyncAuth} />
        <Route path='/' exact component={BurgerBuilder} />
        <Redirect to='/' />
      </React.Fragment>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <React.Fragment>
          <Route path='/checkout' component={asyncCheckout} />
          <Route path='/orders' component={asyncOrders} />
          <Route path='/auth' component={asyncAuth} />
          <Route path='/logout' component={Logout} />
          <Route path='/' exact component={BurgerBuilder} />
          <Redirect to='/' />
        </React.Fragment>
      );
    }
    return (
      <div>
        <Layout>
          <Switch>{routes}</Switch>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: !!state.auth.token,
});

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
