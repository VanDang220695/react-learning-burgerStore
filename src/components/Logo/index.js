import React from 'react';
import { version } from '../../../package.json';

import burgerLogo from '../../assets/images/bugerLogo.png';
import classes from './styles.module.css';

const logo = () => (
  <div className={classes.Logo}>
    <img src={burgerLogo} alt='' />
    <span style={{ marginLeft: '25px', color: 'white' }}>Version {version}</span>
  </div>
);

export default logo;
