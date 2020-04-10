import React from 'react';
import { Button } from 'antd';

import classes from './styles.module.css';

const buildControl = (props) => (
  <div className={classes.BuildControl}>
    <div className={classes.Label}>{props.label}</div>
    <Button onClick={props.remove} disabled={props.disabled}>
      Less
    </Button>
    <Button type='primary' onClick={props.added}>
      More
    </Button>
  </div>
);

export default buildControl;
