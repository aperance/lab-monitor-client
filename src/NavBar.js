import React, { Component } from "react";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";

class NavBar extends Component {
  render() {
    return (
      // <AppBar
      //   title="Lab Monitor"
      //   iconClassNameRight="muidocs-icon-navigation-expand-more"
      //   showMenuIconButton={false}
      //   style={{
      //     backgroundColor: "rgb(0, 134, 212)",
      //     position: "fixed"
      //   }}
      // />
      <AppBar position="fixed" color="default">
        <Toolbar>
          <Typography variant="title" color="inherit">
            Lab Monitor
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default NavBar;
