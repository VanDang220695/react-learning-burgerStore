import React from 'react';

import AuxContainer from '../../../hoc/AuxContainer';
import Button from '../../UI/Button';

const orderSummary = props => {
  const ingredientSummary = Object.keys(props.ingredients).map(igKey => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {props.ingredients[igKey]}
      </li>
    );
  });
  return (
    <AuxContainer>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>
        <strong>Total Price: {props.price}</strong>
      </p>
      <p>Continue to Checkout?</p>
      <Button btnType='Danger' clicked={props.purchaseCanceled}>
        CANCEL
      </Button>
      <Button btnType='Success' clicked={props.purchaseContinued}>
        CONTINUE
      </Button>
    </AuxContainer>
  );
};

export default orderSummary;
