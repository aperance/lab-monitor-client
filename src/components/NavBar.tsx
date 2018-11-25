import * as React from "react";
import { useState } from "react";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  Menu
} from "@material-ui/core";
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

const NavBar = (props: Props) => {
  const [anchor, setAnchor] = useState(null as HTMLElement | null);

  return (
    <AppBar
      position="static"
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
