import * as React from "react";
// @ts-ignore
import { useState } from "react";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/MoreVert";

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

function NavBar(props: Props) {
  const [anchor, setAnchor] = useState(null);

  return (
    <AppBar
      position="fixed"
      color="default"
      elevation={0}
      className={props.classes.root}
    >
      <Toolbar className={props.classes.toolbar}>
        <Typography
          variant="h6"
          color="inherit"
          className={props.classes.title}
        >
          {props.title}
        </Typography>
        <IconButton onClick={e => setAnchor(e.currentTarget)}>
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchor}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          open={anchor}
          onClose={() => setAnchor(null)}
        >
          <MenuItem onClick={() => setAnchor(null)}>Test</MenuItem>
          <MenuItem onClick={() => setAnchor(null)}>Test</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default withStyles(styles)(NavBar);
