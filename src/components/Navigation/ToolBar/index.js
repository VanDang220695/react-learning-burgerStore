import React from 'react';

import Logo from '../../Logo';
import Navigation from '../NavigationItems';

import classes from './index.css';

const toolbar = () => (
  <header className={classes.Toolbar}>
    <div>MENU</div>
    <Logo />
    <nav>
      <Navigation />
    </nav>
  </header>
);

export default toolbar;
