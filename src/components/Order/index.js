import React from 'react';
import moment from 'moment';
import { Card, Row } from 'antd';

const order = (props) => {
  console.log(props);

  const ingredients = [];
  for (let ingredientName in props.ingredients) {
    ingredients.push({ name: ingredientName, amount: props.ingredients[ingredientName] });
  }

  const ingredientOutput = ingredients.map((ig) => {
    return (
      <span
        key={ig.name}
        style={{
          textTransform: 'capitalize',
          display: 'inline-block',
          margin: '0 8px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          padding: '2px 10px',
          color: 'blue',
        }}
      >
        {ig.name}: {ig.amount}
      </span>
    );
  });

  return (
    <Card
      hoverable
      title={
        <Row justify='space-between'>
          <p style={{ margin: 0, padding: 0 }}>OrderId: {props.id}</p>
          <p style={{ margin: 0, padding: 0, color: 'blue' }}>
            Created at: {moment(props.createAt).format('LLL')}
          </p>
        </Row>
      }
    >
      <p>Ingredients: {ingredientOutput}</p>
      <p>
        Price:{' '}
        <strong style={{ color: 'green' }}>{Number.parseFloat(props.price).toFixed(2)} $</strong>
      </p>
    </Card>
  );
};

export default order;
