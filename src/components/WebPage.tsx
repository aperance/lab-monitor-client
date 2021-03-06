import React from "react";
import { Fab, makeStyles } from "@material-ui/core";
import OpenIcon from "@material-ui/icons/OpenInNew";

import config from "../configuration";
import { useSelector } from "../redux/store";

/** CSS-in-JS styling */
const useStyles = makeStyles({
  button: {
    position: "absolute",
    right: "18px",
    top: "18px",
    backgroundColor: "white",
    opacity: 0.5
  },
  frame: { userSelect: "none", borderWidth: "0px" }
});

/**
 * Sub view component which is a wrapper around an iframe used
 * to display state property page hosted on selected device.
 */
const WebPage = (): JSX.Element | null => {
  /** Generated CSS class names */
  const classes = useStyles();
  /** IP Address of target device. */
  const ipAddress = useSelector((state) => state.userSelection.rows[0] || null);
  /** If true, HTTP request is routed through backend server. */
  const isProxyEnabled = useSelector((state) => state.userSelection.proxy);

  if (ipAddress === null) return null;

  const url = isProxyEnabled
    ? `http://${process.env.BACKEND}${config.statePath}&target=${ipAddress}`
    : `http://${ipAddress}:8001${config.statePath}`;

  return (
    <>
      {/* Button to open page in seperate window */}
      <Fab size="small" className={classes.button} href={url} target="_blank">
        <OpenIcon />
      </Fab>
      <iframe
        className={classes.frame}
        src={url}
        width="100%"
        height="100%"
        draggable={false}
      >
        <p>Your browser does not support iframes.</p>
      </iframe>
    </>
  );
};

export default WebPage;
