/**
 *
 * @packageDocumentation
 */

import React from "react";
import {Fab, makeStyles} from "@material-ui/core";
import OpenIcon from "@material-ui/icons/OpenInNew";

import config from "../configuration/configuration";
import {useSelector} from "../redux/store";

/**
 * CSS-in-JS styling.
 * @hidden
 */
const useStyles = makeStyles({
  button: {
    position: "absolute",
    right: "18px",
    top: "18px",
    backgroundColor: "white",
    opacity: 0.5
  }
});

const WebPage = (): JSX.Element | null => {
  const classes = useStyles();
  /** IP Address of target device. */
  const ipAddress = useSelector(state => state.userSelection.rows[0] ?? null);
  /** If true, HTTP request is routed through backend server. */
  const isProxyEnabled = useSelector(state => state.userSelection.proxy);

  if (ipAddress === null) return null;

  const url = isProxyEnabled
    ? `http://${config.httpProxy}${config.statePath}&target=${ipAddress}`
    : `http://${ipAddress}:8001${config.statePath}`;

  return (
    <>
      <Fab size="small" className={classes.button} href={url} target="_blank">
        <OpenIcon />
      </Fab>
      <iframe
        src={url}
        id="qqq"
        title="iframe"
        width="100%"
        height="100%"
        draggable={false}
        style={{userSelect: "none", borderWidth: "0px"}}
      >
        <p>Your browser does not support iframes.</p>
      </iframe>
    </>
  );
};

export default WebPage;
