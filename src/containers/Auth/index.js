import React, { useEffect } from 'react';
import { Form, Button } from 'antd';
import { Redirect } from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

import { FormInput } from '../../components/FormItem';

import Spinner from '../../components/UI/Spinner';

import classes from './styles.module.css';
import enhanceAuth from './enhanceAuth';

const Auth = (props) => {
  const { isSignupSuccess, buildingBurger, authRedirectPath, values } = props;
  const { isSignup } = values;

  const { switchAuthModeHandler, onSetRedirectPath, changeToLoginForm } = props;

  useEffect(() => {
    if (!buildingBurger && authRedirectPath !== '/') {
      onSetRedirectPath();
    }
  }, [buildingBurger, authRedirectPath, onSetRedirectPath]);

  useEffect(() => {
    if (isSignupSuccess) {
      changeToLoginForm();
    }
  }, [isSignupSuccess, changeToLoginForm]);

  let errorMessage = null;

  if (props.error) {
    errorMessage = <p className={classes.Error__Message}>{props.error.message}</p>;
  }

  let authRedirect = null;
  if (props.isAuthenticated) {
    authRedirect = <Redirect to={props.authRedirectPath} />;
  }

  return (
    <div className={classes.Auth}>
      {authRedirect}
      <Spinner spinning={props.loading}>
        <p className={classes.Title__Form_Auth}>{!isSignup ? 'Login' : 'Register'}</p>
        {errorMessage}
        <Form id='formAuth' onFinish={props.handleSubmit}>
          <FormInput
            prefix={
              <UserOutlined className={`site-form-item-icon ${classes[`Icon-Prefix__Color`]}`} />
            }
            placeholder='Your email'
            name='email'
          />
          <FormInput
            prefix={
              <LockOutlined className={`site-form-item-icon ${classes[`Icon-Prefix__Color`]}`} />
            }
            name='password'
            type='password'
            placeholder='Your password'
            autoComplete='true'
          />
          {isSignup && (
            <FormInput
              prefix={
                <LockOutlined className={`site-form-item-icon ${classes[`Icon-Prefix__Color`]}`} />
              }
              name='confirmationPassword'
              type='password'
              placeholder='Confirm your password'
              autoComplete='true'
            />
          )}

          <Button type='primary' block htmlType='submit'>
            SUBMIT
          </Button>
        </Form>
        <p onClick={switchAuthModeHandler} className={classes.Txt__SwitchSign}>
          Switch to {isSignup ? 'login' : 'register'}
        </p>
      </Spinner>
    </div>
  );
};

export default enhanceAuth(Auth);
