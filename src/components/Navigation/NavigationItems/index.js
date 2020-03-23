import React from 'react';

import NavItem from './NavigationItem';
import classes from './index.css';

const navigationItems = () => (
  <ul className={classes.NavigationItems}>
    <NavItem link='/' exact>
      Burger Builder
    </NavItem>
    <NavItem link='/orders'>Orders</NavItem>
  </ul>
);

export default navigationItems;
