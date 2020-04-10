import React from 'react';
import { Button } from 'antd';

import BuildControl from './BuildControl';
import classes from './styles.module.css';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Chesse', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
];

const buildControls = (props) => (
  <div className={classes.BuildControls}>
    <p>
      Current Price: <strong>{props.price}</strong>
    </p>
    {controls.map((ctrl) => (
      <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        disabled={props.disabled[ctrl.type]}
        added={() => props.ingredientAdded(ctrl.type)}
        remove={() => props.ingredientRemoved(ctrl.type)}
      />
    ))}
    <Button
      className={classes.OrderButton}
      disabled={!props.purchasable}
      onClick={props.orderd}
      type='primary'
      ghost
    >
      {props.isAuth ? 'ORDER NOW' : 'SIGN IN TO ORDER'}
    </Button>
  </div>
);

export default buildControls;
