import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'antd';

import Spinner from '../../../components/UI/Spinner';
import Input from '../../../components/UI/Input';

import configAxios from '../../../utils/axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler';
import * as actionTypes from '../../../store/actions';
import { updateObject, checkValidity } from '../../../shared/utility';

import classes from './styles.module.css';

const axios = configAxios();

const ContactData = (props) => {
  const [orderForm, setOrderForm] = useState({
    name: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Your Name',
      },
      value: '',
      valdation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    street: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Street',
      },
      value: '',
      valdation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    zipCode: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'ZIP Code',
      },
      value: '',
      valdation: {
        required: true,
        minLength: 5,
        maxLength: 10,
        isNumeric: true,
      },
      valid: false,
      touched: false,
    },
    country: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Country',
      },
      value: '',
      valdation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Email',
      },
      value: '',
      valdation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    },
    deliveryMethod: {
      elementType: 'select',
      elementConfig: {
        options: [
          { value: 'fastest', displayValue: 'Fastest' },
          { value: 'cheapest', displayValue: 'Cheapest' },
        ],
      },
      valdation: {},
      value: 'cheapest',
      valid: true,
    },
  });
  const [formIsValid, setFormIsValid] = useState(false);
  const orderHandler = (e) => {
    e.preventDefault();
    let formData = {};
    for (let formElement in orderForm) {
      formData[formElement] = orderForm[formElement].value;
    }
    const order = {
      ingredients: props.ings,
      price: props.price,
      orderData: formData,
      token: props.token,
      userId: props.userId,
    };
    props.onOrderBurger(order);
    props.history.push('/');
  };
  const inputChangeHanlder = (e, inputIdentifier) => {
    const { value } = e.target;
    const formIdentifierValue = orderForm[inputIdentifier];
    const updateFormElement = updateObject(formIdentifierValue, {
      value: value,
      valid: checkValidity(value, formIdentifierValue.valdation),
      touched: true,
    });

    const updateOrderForm = updateObject(this.state.orderForm, {
      [inputIdentifier]: updateFormElement,
    });

    let formIsValid = true;
    for (let inputElement in updateOrderForm) {
      formIsValid = updateOrderForm[inputElement].valid && formIsValid;
    }

    setOrderForm(updateOrderForm);
    setFormIsValid(formIsValid);
  };

  const formElementArray = [];
  for (let key in orderForm) {
    formElementArray.push({
      id: key,
      config: orderForm[key],
    });
  }
  let form = (
    <form onSubmit={orderHandler}>
      {formElementArray.map((formElement) => (
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
      ))}
      <Button type='primary' disabled={!formIsValid}>
        ORDER
      </Button>
    </form>
  );
  if (props.loading) {
    form = <Spinner />;
  }
  return (
    <div className={classes.ContactData}>
      <h4>Enter your contact data</h4>
      {form}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onOrderBurger: (payload) => dispatch(actionTypes.purchaseBurger(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withErrorHandler(withRouter(ContactData), axios));
