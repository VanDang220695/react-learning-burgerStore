import React from 'react';

import Logo from '../../Logo';
import NavigationItems from '../../Navigation/NavigationItems';
import Backdrop from '../../UI/BackDrop';
import AuxContainer from '../../../hoc/AuxContainer';

import classes from './styles.module.css';

const sideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }
  return (
    <AuxContainer>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(' ')} onClick={props.closed}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuthenticated={props.isAuth} />
        </nav>
      </div>
    </AuxContainer>
  );
};

export default sideDrawer;
