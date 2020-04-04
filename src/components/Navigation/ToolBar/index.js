import React from 'react';

import Logo from '../../Logo';
import Navigation from '../NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle';

import classes from './styles.module.css';

const toolbar = (props) => (
  <header className={classes.Toolbar}>
    <DrawerToggle clicked={props.toggleDrawer} />
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
      <Navigation isAuthenticated={props.isAuth} />
    </nav>
  </header>
);

export default toolbar;
