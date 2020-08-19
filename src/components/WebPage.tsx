import React, {useContext} from "react";
import {useSelector} from "react-redux";
import {Fab, makeStyles} from "@material-ui/core";
import OpenIcon from "@material-ui/icons/OpenInNew";

import {ConfigurationContext} from "../configuration/ConfigurationContext";
import {StoreState} from "../redux/store";

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

/**
 * Redux selector function (equivilant to mapStateToProps).
 */
const reduxSelector = (state: StoreState) => {
  return {
    ipAddress: state.userSelection.rows[0] ?? null,
    proxyEnabled: state.userSelection.proxy
  };
};

/**
 *
 */
const WebPage = () => {
  const classes = useStyles();
  const {ipAddress, proxyEnabled} = useSelector(reduxSelector);
  const {httpProxy, statePath} = useContext(ConfigurationContext);

  if (ipAddress === null) return null;

  const url = proxyEnabled
    ? `http://${httpProxy}${statePath}&target=${ipAddress}`
    : `http://${ipAddress}:8001${statePath}`;

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
