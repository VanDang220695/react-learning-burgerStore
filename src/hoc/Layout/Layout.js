import React, { Component } from "react";

import AuxContainer from "../AuxContainer";
import classes from "./Layout.css";

import Toolbar from "../../components/Navigation/ToolBar";
import SideDrawer from "../../components/Navigation/SideDrawer";

class Layout extends Component {
  state = {
    showSideDrawer: false
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
          <Toolbar toggleDrawer={this.sideDrawerToggleHandler} />
          <SideDrawer
            open={this.state.showSideDrawer}
            closed={this.sideDrawerClosedHandler}
          />
          <main className={classes.Content}>{this.props.children}</main>
        </div>
      </AuxContainer>
    );
  }
}

export default Layout;
