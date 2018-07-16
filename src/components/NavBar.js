import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const styles = theme => ({
  root: {
    backgroundColor: "white",
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
    zIndex: 0
  },
  icon: {
    marginLeft: -12,
    marginRight: 20
  }
});

class NavBar extends Component {
  render() {
    return (
      <AppBar
        position="fixed"
        color="default"
        elevation="0"
        className={this.props.classes.root}
      >
        <Toolbar style={{ minHeight: "56px" }}>
          <IconButton color="inherit" className={this.props.classes.icon}>
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit">
            Lab Monitor
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(NavBar);
