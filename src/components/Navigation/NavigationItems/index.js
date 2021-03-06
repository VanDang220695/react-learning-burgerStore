import React from 'react';

import NavItem from './NavigationItem';
import classes from './styles.module.css';

const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavItem link='/' exact>
      Burger Builder
    </NavItem>
    {props.isAuthenticated && (
      <React.Fragment>
        <NavItem link='/orders'>Orders</NavItem>
        <NavItem link='/profile'>Profile</NavItem>
      </React.Fragment>
    )}
    {!props.isAuthenticated ? (
      <NavItem link='/auth'>Authenticate</NavItem>
    ) : (
      <NavItem link='/logout'>Logout</NavItem>
    )}
  </ul>
);

export default navigationItems;
