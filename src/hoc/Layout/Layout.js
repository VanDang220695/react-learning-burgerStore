import React, { useState } from 'react';
import { connect } from 'react-redux';

import AuxContainer from '../AuxContainer';
import classes from './styles.module.css';

import Toolbar from '../../components/Navigation/ToolBar';
import SideDrawer from '../../components/Navigation/SideDrawer';

const Layout = (props) => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const sideDrawerClosedHandler = () => {
    setShowSideDrawer(false);
  };
  const sideDrawerToggleHandler = () => {
    setShowSideDrawer((prevState) => !prevState);
  };

  return (
    <AuxContainer>
      <div className={classes.Container}>
        <Toolbar toggleDrawer={sideDrawerToggleHandler} isAuth={props.isAuthenticated} />
        <SideDrawer
          open={showSideDrawer}
          closed={sideDrawerClosedHandler}
          isAuth={props.isAuthenticated}
        />
        <main className={classes.Content}>{props.children}</main>
      </div>
    </AuxContainer>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.token,
});

export default connect(mapStateToProps)(Layout);
