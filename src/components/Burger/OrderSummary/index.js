import React from 'react';
import { Card } from 'antd';

import burgerImg from '../../../assets/images/burgerImg.png';

import AuxContainer from '../../../hoc/AuxContainer';

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map((igKey) => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {props.ingredients[igKey]}
      </li>
    );
  });
  return (
    <AuxContainer>
      <Card
        title='Your order'
        hoverable
        headStyle={{ color: 'blue' }}
        cover={
          <div style={{ width: '100%', marginLeft: 'calc(50% - 100px)', marginTop: '10px' }}>
            <img
              style={{ width: '200px', height: '200px', backgroundColor: '#fff' }}
              alt=''
              src={burgerImg}
            />
          </div>
        }
      >
        <p>A delicious burger with the following ingredients:</p>
        <ul>{ingredientSummary}</ul>
        <p>
          <strong>
            Total Price:<span style={{ color: '#33CC33', marginLeft: '5px' }}>{props.price}$</span>{' '}
          </strong>
        </p>
        <p>Continue to Checkout?</p>
      </Card>
    </AuxContainer>
  );
};

export default orderSummary;
