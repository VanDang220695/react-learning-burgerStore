import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';
import Spinner from '../../components/UI/Spinner';

import * as actions from '../../store/actions';
import { updateObject, checkValidity } from '../../shared/utility';

import classes from './styles.css';

const Auth = (props) => {
  const [controls, setControls] = useState({
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Mail Address',
      },
      value: '',
      valdation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    },
    password: {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        placeholder: 'Password',
      },
      value: '',
      valdation: {
        required: true,
        minLength: 6,
        maxLength: 10,
      },
      valid: false,
      touched: false,
    },
  });
  const [isSignup, setIsSignup] = useState(true);

  const { buildingBurger, authRedirectPath, onSetRedirectPath, onAuth } = props;
  useEffect(() => {
    if (!buildingBurger && authRedirectPath !== '/') {
      onSetRedirectPath();
    }
  }, [buildingBurger, authRedirectPath, onSetRedirectPath]);

  const inputChangeHanlder = (e, controlName) => {
    const { value } = e.target;
    const updateControls = updateObject(controls, {
      [controlName]: updateObject(controls[controlName], {
        value,
        valid: checkValidity(value, controls[controlName].valdation),
        touched: true,
      }),
    });
    setControls(updateControls);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    onAuth(controls.email.value, controls.password.value, isSignup);
  };

  const switchAuthModeHandler = () => {
    setIsSignup((prevState) => !prevState);
  };

  const formElementArray = [];
  for (let key in controls) {
    formElementArray.push({
      id: key,
      config: controls[key],
    });
  }

  let form = formElementArray.map((formElement) => (
    <Input
      key={formElement.id}
      elementType={formElement.config.elementType}
      elementConfig={formElement.config.elementConfig}
      value={formElement.config.value}
      invalid={!formElement.config.valid}
      touched={formElement.config.touched}
      valueType={formElement.id}
      changed={(event) => inputChangeHanlder(event, formElement.id)}
      shouldValidate={formElement.config.valdation}
    />
  ));

  if (props.loading) {
    form = <Spinner />;
  }

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
      <form onSubmit={submitHandler}>
        {form}
        <Button btnType='Success'>SUBMIT</Button>
      </form>
      <Button btnType='Danger' clicked={switchAuthModeHandler}>
        SWITCH TO {isSignup ? 'SIGNIN' : 'SIGNUP'}
      </Button>
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
