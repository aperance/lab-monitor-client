import * as React from "react";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const styles = createStyles({
  root: {
    backgroundColor: "white",
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
    zIndex: 0
  },
  toolbar: { minHeight: "56px" },
  title: {
    flexGrow: 1,
    color: "rgba(0, 0, 0, 0.75)",
    fontSize: "1.2rem"
  }
});

interface Props extends WithStyles<typeof styles> {
  title: string;
}

const NavBar = (props: Props) => (
  <AppBar
    position="fixed"
    color="default"
    elevation={0}
    className={props.classes.root}
  >
    <Toolbar className={props.classes.toolbar}>
      <Typography
        variant="title"
        color="inherit"
        className={props.classes.title}
      >
        {props.title}
      </Typography>
    </Toolbar>
  </AppBar>
);

export default withStyles(styles)(NavBar);
