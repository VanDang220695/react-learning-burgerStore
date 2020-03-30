import React from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button';
import Spinner from '../../../components/UI/Spinner';
import Input from '../../../components/UI/Input';

import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler';
import * as actionTypes from '../../../store/actions';
import { updateObject, checkValidity } from '../../../shared/utility';

import classes from './styles.css';

class ContactData extends React.Component {
  state = {
    orderForm: {
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
    },
    formIsValid: false,
  };

  orderHandler = e => {
    e.preventDefault();
    let formData = {};
    for (let formElement in this.state.orderForm) {
      formData[formElement] = this.state.orderForm[formElement].value;
    }
    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
    };
    this.props.onOrderBurger(order, this.props.token);
  };
  inputChangeHanlder = (e, inputIdentifier) => {
    const { value } = e.target;
    const formIdentifierValue = this.state.orderForm[inputIdentifier];
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

    this.setState({ orderForm: updateOrderForm, formIsValid });
  };

  render() {
    const formElementArray = [];
    for (let key in this.state.orderForm) {
      formElementArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementArray.map(formElement => (
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
        ))}
        <Button btnType='Success' disabled={!this.state.formIsValid}>
          ORDER
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
  };
};

const mapDispatchToProps = dispatch => ({
  onOrderBurger: orderData => dispatch(actionTypes.purchaseBurger(orderData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
