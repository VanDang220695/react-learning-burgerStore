import React from 'react';

import NotFoundImg from '../../assets/images/pageNotFound.jpg';

import classes from './styles.module.css';

const NotFound = () => {
  return (
    <div className={classes.Not__Found}>
      <img src={NotFoundImg} alt='' />
    </div>
  );
};

export default NotFound;
