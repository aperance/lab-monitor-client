import React, {useContext} from "react";
import {useSelector} from "react-redux";
import {Fab, makeStyles} from "@material-ui/core";
import OpenIcon from "@material-ui/icons/OpenInNew";
import {ConfigurationContext} from "../configuration/ConfigurationContext";
import {StoreState} from "../redux/store";

const useStyles = makeStyles({
  button: {
    position: "absolute",
    right: "18px",
    top: "18px",
    backgroundColor: "white",
    opacity: 0.5
  }
});

const WebPage = () => {
  const classes = useStyles();
  const {httpProxy, statePath} = useContext(ConfigurationContext);
  const ipAddress = useSelector(({userSelection}: StoreState) =>
    userSelection.rows.length === 1 ? userSelection.rows[0] : null
  );
  const proxyEnabled = useSelector(
    ({userSelection}: StoreState) => userSelection.proxy
  );

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
