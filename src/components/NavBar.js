import React, { Component } from "react";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";

class NavBar extends Component {
  render() {
    return (
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
