/**
 *
 * @packageDocumentation
 */

import React, { useState, useContext } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  MenuItem,
  Menu,
  makeStyles
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/MoreVert";

import config from "../configuration";
import { WebsocketContext } from "../WebsocketContext";

/** CSS-in-JS styling */
const useStyles = makeStyles({
  root: {
    backgroundColor: "white",
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
    zIndex: 0
  },
  toolbar: {
    minHeight: "56px",
    "& > span": {
      flexGrow: 1,
      color: "rgba(0, 0, 0, 0.75)",
      fontSize: "1.2rem",
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      userSelect: "none"
    }
  },
  menuItem: { fontSize: "0.8rem" }
});

const NavBar = (): JSX.Element => {
  /** Generated CSS class names */
  const classes = useStyles();
  const ws = useContext(WebsocketContext);
  const [anchor, setAnchor] = useState(null as HTMLElement | null);

  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      className={classes.root}
    >
      <Toolbar className={classes.toolbar}>
        <span>{config.title}</span>
        <IconButton onClick={(e) => setAnchor(e.currentTarget)}>
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
          <MenuItem
            className={classes.menuItem}
            onClick={() => {
              ws.refreshDevice();
              setAnchor(null);
            }}
          >
            Force Rescan
          </MenuItem>
          <MenuItem
            className={classes.menuItem}
            onClick={() => {
              ws.clearDevice();
              setAnchor(null);
            }}
          >
            Reset Server
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default React.memo(NavBar);
