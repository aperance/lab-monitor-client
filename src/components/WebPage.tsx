import * as React from "react";
import { useContext } from "react";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import { Button } from "@material-ui/core";
import OpenIcon from "@material-ui/icons/OpenInNew";
import { ConfigurationContext } from "../configuration/ConfigurationContext";

const styles = createStyles({
  button: {
    position: "absolute",
    right: "18px",
    top: "18px",
    backgroundColor: "white",
    opacity: 0.5
  }
});

interface Props extends WithStyles<typeof styles> {
  ipAddress: string | null;
  proxyEnabled: boolean;
}

const WebPage = (props: Props) => {
  const { httpProxy, statePath } = useContext(ConfigurationContext);

  if (props.ipAddress === null) return null;

  const url = props.proxyEnabled
    ? `http://${httpProxy}${statePath}&target=${props.ipAddress}`
    : `http://${props.ipAddress}:8001${statePath}`;

  return (
    <>
      <Button
        variant="fab"
        mini={true}
        className={props.classes.button}
        href={url}
        target="_blank"
      >
        <OpenIcon />
      </Button>
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

export default withStyles(styles)(WebPage);
