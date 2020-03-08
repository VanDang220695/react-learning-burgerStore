import React from 'react';

import classes from './index.css';
import Aux from '../../../hoc/Aux';
import Backdrop from '../BackDrop';

const modal = props => (
  <Aux>
    <Backdrop show={props.show} clicked={props.modalClosed} />
    <div
      className={classes.Modal}
      style={{
        transform: props.show ? 'translateY(0)' : 'translate(-100vh)',
        opacity: props.show ? '1' : '0',
      }}
    >
      {props.children}
    </div>
  </Aux>
);

export default modal;
