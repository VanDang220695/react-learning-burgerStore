import React from 'react';

import BuildControl from './BuildControl';
import classes from './index.css';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Chesse', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
];

const buildControls = props => (
  <div className={classes.BuildControls}>
    <p>
      Current Price: <strong>{props.price.toFixed(2)}</strong>
    </p>
    {controls.map(ctrl => (
      <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        disabled={props.disabled[ctrl.type]}
        added={() => props.ingredientAdded(ctrl.type)}
        remove={() => props.ingredientRemoved(ctrl.type)}
      />
    ))}
    <button className={classes.OrderButton} disabled={!props.purchasable}>
      ORDER NOW
    </button>
  </div>
);

export default buildControls;
