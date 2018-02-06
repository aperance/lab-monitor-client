import React, { Component } from "react";
import AppBar from "material-ui/AppBar";

class NavBar extends Component {
  render() {
    return (
      <AppBar
        title="Lab Monitor"
        iconClassNameRight="muidocs-icon-navigation-expand-more"
      />
    );
  }
}

export default NavBar;
