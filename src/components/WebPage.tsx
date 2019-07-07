import * as React from "react";
import { useContext } from "react";
import { makeStyles } from "@material-ui/styles";
import { Fab } from "@material-ui/core";
import OpenIcon from "@material-ui/icons/OpenInNew";
import { ConfigurationContext } from "../configuration/ConfigurationContext";

const useStyles = makeStyles({
  button: {
    position: "absolute",
    right: "18px",
    top: "18px",
    backgroundColor: "white",
    opacity: 0.5
  }
});

interface Props {
  ipAddress: string | null;
  proxyEnabled: boolean;
}

const WebPage = (props: Props) => {
  const classes = useStyles();
  const { httpProxy, statePath } = useContext(ConfigurationContext);

  if (props.ipAddress === null) return null;

  const url = props.proxyEnabled
    ? `http://${httpProxy}${statePath}&target=${props.ipAddress}`
    : `http://${props.ipAddress}:8001${statePath}`;

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
        style={{ userSelect: "none", borderWidth: "0px" }}
      >
        <p>Your browser does not support iframes.</p>
      </iframe>
    </>
  );
};

export default WebPage;
