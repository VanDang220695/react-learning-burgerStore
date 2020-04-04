import React, { useState, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '../../store/actions';

import classes from './styles.module.css';

const Auth = (props) => {
  const [isSignup, setIsSignup] = useState(true);

  const { buildingBurger, authRedirectPath, onSetRedirectPath, onAuth } = props;
  useEffect(() => {
    if (!buildingBurger && authRedirectPath !== '/') {
      onSetRedirectPath();
    }
  }, [buildingBurger, authRedirectPath, onSetRedirectPath]);

  const submitHandler = (formValue) => {
    const { email, password } = formValue;
    onAuth(email, password, isSignup);
  };

  const switchAuthModeHandler = () => {
    setIsSignup((prevState) => !prevState);
  };

  // if (props.loading) {
  //   form = <Spinner />;
  // }

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
      {errorMesssage}
      {/* <form onSubmit={submitHandler}>
        {form}
        <Button btnType='Success'>SUBMIT</Button>
      </form>
      <Button btnType='Danger' clicked={switchAuthModeHandler}>
        SWITCH TO {isSignup ? 'SIGNIN' : 'SIGNUP'}
      </Button> */}
      <p className={classes.title__form_auth}>{isSignup ? 'Login' : 'Register'}</p>
      <Form name='authentication' onFinish={submitHandler}>
        <Form.Item
          name='email'
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
            {
              type: 'email',
              message: 'Your email is invalid',
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className='site-form-item-icon' />}
            placeholder='Your email'
          />
        </Form.Item>
        <Form.Item
          name='password'
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
            {
              min: 6,
              message: 'Minimum password length six characters',
            },
            {
              max: 10,
              message: 'Maximum password length ten characters',
            },
            () => {
              return {
                validator(_, value) {
                  if (
                    !value ||
                    value.length < 6 ||
                    value.length > 10 ||
                    /(?=.*[0-9])+(?=.*[A-Z])/g.test(value)
                  ) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject(
                      'The password must contain at least one uppercase character and numeric character',
                    );
                  }
                },
              };
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className='site-form-item-icon' />}
            type='password'
            placeholder='Your password'
          />
        </Form.Item>
        <Button type='primary' block htmlType='submit' style={{ marginTop: '16px' }}>
          SUBMIT
        </Button>
      </Form>
      <p onClick={switchAuthModeHandler} className={classes.txt__switchSign}>
        Switch to {isSignup ? 'signin' : 'signup'}
      </p>
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  error: state.auth.error,
  isAuthenticated: !!state.auth.token,
  buildingBurger: state.burgerBuilder.building,
  authRedirectPath: state.auth.authRedirectPath,
});

const mapDispatchToProps = (dispatch) => ({
  onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
  onSetRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
