/**
 *
 * @packageDocumentation
 */

import React, {useState, useContext} from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  MenuItem,
  Menu,
  makeStyles
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/MoreVert";

import {ConfigurationContext} from "../configuration/ConfigurationContext";
import {WebsocketContext} from "../websockets/WebsocketContext";
import {refreshDevice, clearDevice} from "../websockets/messageCreators";

/**
 * CSS-in-JS styling.
 * @hidden
 */
const useStyles = makeStyles({
  root: {
    backgroundColor: "white",
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
    zIndex: 0
  },
  toolbar: {minHeight: "56px"},
  title: {
    flexGrow: 1,
    color: "rgba(0, 0, 0, 0.75)",
    fontSize: "1.2rem",
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    userSelect: "none"
  },
  menuItem: {fontSize: "0.8rem"}
});

/**
 *
 */
const NavBar = () => {
  const classes = useStyles();
  const ws = useContext(WebsocketContext);
  const {title} = useContext(ConfigurationContext);
  const [anchor, setAnchor] = useState(null as HTMLElement | null);

  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      className={classes.root}
    >
      <Toolbar className={classes.toolbar}>
        <span className={classes.title}>{title}</span>
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
          <MenuItem
            className={classes.menuItem}
            onClick={() => {
              ws.send(refreshDevice());
              setAnchor(null);
            }}
          >
            Force Rescan
          </MenuItem>
          <MenuItem
            className={classes.menuItem}
            onClick={() => {
              ws.send(clearDevice());
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
