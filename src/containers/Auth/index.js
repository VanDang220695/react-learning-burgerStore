import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';
import Spinner from '../../components/UI/Spinner';

import * as actions from '../../store/actions';
import { updateObject } from '../../shared/utility';

import classes from './styles.css';

class Auth extends Component {
  state = {
    controls: {
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
    },
    isSignup: true,
  };

  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
      this.props.onSetRedirectPath();
    }
  }

  checkValidity = (value, rules) => {
    let isValid = true;
    if (!rules) return isValid;
    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if (rules.minLength) {
      isValid = value.trim().length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.trim().length <= rules.maxLength && isValid;
    }
    if (rules.isEmail) {
      // eslint-disable-next-line no-useless-escape
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      isValid = pattern.test(value) && isValid;
    }
    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }
    return isValid;
  };

  inputChangeHanlder = (e, controlName) => {
    const { controls } = this.state;
    const { value } = e.target;
    const updateControls = updateObject(controls, {
      [controlName]: updateObject(controls[controlName], {
        value,
        valid: this.checkValidity(value, controls[controlName].valdation),
        touched: true,
      }),
    });
    this.setState({ controls: updateControls });
  };

  submitHandler = e => {
    e.preventDefault();
    const { controls, isSignup } = this.state;
    this.props.onAuth(controls.email.value, controls.password.value, isSignup);
  };

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {
        isSignup: !prevState.isSignup,
      };
    });
  };

  render() {
    const formElementArray = [];
    for (let key in this.state.controls) {
      formElementArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }

    let form = formElementArray.map(formElement => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        touched={formElement.config.touched}
        valueType={formElement.id}
        changed={event => this.inputChangeHanlder(event, formElement.id)}
        shouldValidate={formElement.config.valdation}
      />
    ));

    if (this.props.loading) {
      form = <Spinner />;
    }

    let errorMesssage = null;

    if (this.props.error) {
      errorMesssage = (
        <p style={{ textAlign: 'center', textTransform: 'capitalize', color: 'red' }}>
          {this.props.error.message}
        </p>
      );
    }

    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />;
    }

    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMesssage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType='Success'>SUBMIT</Button>
        </form>
        <Button btnType='Danger' clicked={this.switchAuthModeHandler}>
          SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.auth.loading,
  error: state.auth.error,
  isAuthenticated: !!state.auth.token,
  buildingBurger: state.burgerBuilder.building,
  authRedirectPath: state.auth.authRedirectPath,
});

const mapDispatchToProps = dispatch => ({
  onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
  onSetRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
