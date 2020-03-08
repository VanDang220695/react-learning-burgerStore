import React from 'react';

import NavItem from './NavigationItem';
import classes from './index.css';

const navigationItems = () => (
  <ul className={classes.NavigationItems}>
    <NavItem link='/' active>
      Burger
    </NavItem>
    <NavItem link='/'>Checkout</NavItem>
  </ul>
);

export default navigationItems;
