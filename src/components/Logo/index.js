import React from 'react';

import burgerLogo from '../../assets/images/bugerLogo.png';
import classes from './styles.module.css';

const logo = () => (
  <div className={classes.Logo}>
    <img src={burgerLogo} alt='' />
    <span style={{ marginLeft: '25px', color: 'white' }}>Version 1.03</span>
  </div>
);

export default logo;
