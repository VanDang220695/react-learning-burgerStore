import React from 'react';

import burgerLogo from '../../assets/images/bugerLogo.png';
import classes from './styles.module.css';

const logo = () => (
  <div className={classes.Logo}>
    <img src={burgerLogo} alt='' />
  </div>
);

export default logo;
