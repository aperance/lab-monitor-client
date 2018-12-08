import * as React from "react";
import { useState, useContext } from "react";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import { AppBar, Toolbar, IconButton, MenuItem, Menu } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/MoreVert";
import { ConfigurationContext } from "../configuration/ConfigurationContext";

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
    fontSize: "1.2rem",
    userSelect: "none"
  }
});

interface Props extends WithStyles<typeof styles> {}

const NavBar = (props: Props) => {
  const { title } = useContext(ConfigurationContext);
  const [anchor, setAnchor] = useState(null as HTMLElement | null);

  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      className={props.classes.root}
    >
      <Toolbar className={props.classes.toolbar}>
        <span className={props.classes.title}>{title}</span>
        <IconButton onClick={e => setAnchor(e.currentTarget)}>
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchor}
          open={anchor ? true : false}
          onClose={() => setAnchor(null)}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
        >
          <MenuItem onClick={() => setAnchor(null)}>Test</MenuItem>
          <MenuItem onClick={() => setAnchor(null)}>Test</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(styles)(React.memo(NavBar));
