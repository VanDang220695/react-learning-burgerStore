import React from 'react';

import NavItem from './NavigationItem';
import classes from './index.css';

const navigationItems = props => (
  <ul className={classes.NavigationItems}>
    <NavItem link='/' exact>
      Burger Builder
    </NavItem>
    {props.isAuthenticated && <NavItem link='/orders'>Orders</NavItem>}
    {!props.isAuthenticated ? (
      <NavItem link='/auth'>Authenticate</NavItem>
    ) : (
      <NavItem link='/logout'>Logout</NavItem>
    )}
  </ul>
);

export default navigationItems;
