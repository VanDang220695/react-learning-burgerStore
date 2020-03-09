import React from 'react';

import Logo from '../../Logo';
import NavigationItems from '../../Navigation/NavigationItems';

import classes from './styles.css';

const sideDrawer = props => {
  return (
    <div className={classes.SideDrawer}>
      <div className={classes.Logo}>
        <Logo />
      </div>
      <nav>
        <NavigationItems />
      </nav>
    </div>
  );
};

export default sideDrawer;
