import React, { Component } from 'react';
import { connect } from 'react-redux';

import AuxContainer from '../AuxContainer';
import classes from './Layout.css';

import Toolbar from '../../components/Navigation/ToolBar';
import SideDrawer from '../../components/Navigation/SideDrawer';

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };
  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };
  sideDrawerToggleHandler = () => {
    this.setState(prevState => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  render() {
    return (
      <AuxContainer>
        <div className={classes.Container}>
          <Toolbar
            toggleDrawer={this.sideDrawerToggleHandler}
            isAuth={this.props.isAuthenticated}
          />
          <SideDrawer
            open={this.state.showSideDrawer}
            closed={this.sideDrawerClosedHandler}
            isAuth={this.props.isAuthenticated}
          />
          <main className={classes.Content}>{this.props.children}</main>
        </div>
      </AuxContainer>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: !!state.auth.token,
});

export default connect(mapStateToProps)(Layout);
