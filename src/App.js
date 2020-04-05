import React, { useEffect, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Spinner from './components/UI/Spinner';

import Layout from './hoc/Layout/Layout';
import Logout from './containers/Auth/Logout';

import * as actions from './store/actions';

import classes from './app.module.css';

const Checkout = React.lazy(() => {
  return import('./containers/Checkout');
});
const Orders = React.lazy(() => {
  return import('./containers/Orders');
});

const Auth = React.lazy(() => {
  return import('./containers/Auth');
});

const BurgerBuilder = React.lazy(() => {
  return import('./containers/BurgerBuilder');
});

const App = (props) => {
  const { onTryAutoSignup } = props;
  useEffect(() => {
    onTryAutoSignup();
  }, [onTryAutoSignup]);
  let routes = (
    <Switch>
      <Route path='/auth' render={(props) => <Auth {...props} />} />
      <Route path='/' exact component={BurgerBuilder} />
      <Redirect to='/' />
    </Switch>
  );
  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path='/checkout' render={(props) => <Checkout {...props} />} />
        <Route path='/orders' render={(props) => <Orders {...props} />} />
        <Route path='/auth' render={(props) => <Auth {...props} />} />
        <Route path='/logout' component={Logout} />
        <Route path='/' exact render={(props) => <BurgerBuilder {...props} />} />
        <Redirect to='/' />
      </Switch>
    );
  }
  return (
    <div>
      <Layout>
        <Suspense fallback={<Spinner className={classes.Spinner} />}>{routes}</Suspense>
      </Layout>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.token,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
