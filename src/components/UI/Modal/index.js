import React from 'react';

import classes from './styles.module.css';
import AuxContainer from '../../../hoc/AuxContainer';
import Backdrop from '../BackDrop';

const modal = (props) => {
  return (
    <AuxContainer>
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
    </AuxContainer>
  );
};

export default React.memo(
  modal,
  (prevProps, nextProps) =>
    nextProps.show !== prevProps.show || nextProps.children !== prevProps.children,
);
