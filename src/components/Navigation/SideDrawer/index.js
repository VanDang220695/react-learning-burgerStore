import React from "react";

import Logo from "../../Logo";
import NavigationItems from "../../Navigation/NavigationItems";
import Backdrop from "../../UI/BackDrop";
import AuxContainer from "../../../hoc/AuxContainer";

import classes from "./styles.css";

const sideDrawer = props => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }
  return (
    <AuxContainer>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(" ")}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </AuxContainer>
  );
};

export default sideDrawer;
