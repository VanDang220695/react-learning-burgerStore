import React, { useState, useEffect } from 'react';
import { Form, Button } from 'antd';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Spinner from '../../components/UI/Spinner';
import FormSignin from '../../components/FormSignin';
import FormSignup from '../../components/FormSignup';

import * as actions from '../../store/actions';

import classes from './styles.module.css';

const Auth = (props) => {
  const [isSignup, setIsSignup] = useState(false);

  const { isSignupSuccess, buildingBurger, authRedirectPath, onSetRedirectPath, onAuth } = props;
  useEffect(() => {
    if (!buildingBurger && authRedirectPath !== '/') {
      onSetRedirectPath();
    }
  }, [buildingBurger, authRedirectPath, onSetRedirectPath]);

  useEffect(() => {
    if (isSignupSuccess) {
      setIsSignup(false);
    }
  }, [isSignupSuccess]);

  let form = <FormSignup />;
  if (!isSignup || isSignupSuccess) {
    form = <FormSignin />;
  }

  const submitHandler = (formValue) => {
    const { email, password } = formValue;
    onAuth(email, password, isSignup);
    if (isSignupSuccess) {
      form = <FormSignin />;
    }
  };

  const switchAuthModeHandler = () => {
    setIsSignup((prevState) => !prevState);
  };

  let errorMesssage = null;

  if (props.error) {
    errorMesssage = (
      <p style={{ textAlign: 'center', textTransform: 'capitalize', color: 'red' }}>
        {props.error.message}
      </p>
    );
  }

  let authRedirect = null;
  if (props.isAuthenticated) {
    authRedirect = <Redirect to={props.authRedirectPath} />;
  }

  return (
    <div className={classes.Auth}>
      {authRedirect}
      <Spinner spinning={props.loading}>
        <p className={classes.title__form_auth}>{!isSignup ? 'Login' : 'Register'}</p>
        {errorMesssage}
        <Form initialValues={{ remember: true }} name='authentication' onFinish={submitHandler}>
          {form}
          <Button type='primary' block htmlType='submit' style={{ marginTop: '16px' }}>
            SUBMIT
          </Button>
        </Form>
        <p onClick={switchAuthModeHandler} className={classes.txt__switchSign}>
          Switch to {isSignup ? 'signin' : 'signup'}
        </p>
      </Spinner>
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  error: state.auth.error,
  isAuthenticated: !!state.auth.token,
  buildingBurger: state.burgerBuilder.building,
  authRedirectPath: state.auth.authRedirectPath,
  isSignupSuccess: state.auth.isSingupSuccess,
});

const mapDispatchToProps = (dispatch) => ({
  onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
  onSetRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
