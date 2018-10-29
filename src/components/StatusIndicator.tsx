import * as React from "react";
// @ts-ignore
import { useState, useEffect } from "react";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";

const styles = createStyles({
  root: {
    fontSize: "15px",
    transition: "opacity 0.5s",
    paddingTop: "2px"
  }
});

const colorLookup: { [x: string]: string } = {
  CONNECTED: "mediumseagreen",
  RETRY: "mediumseagreen",
  DISCONNECTED: "rgb(239, 239, 35)",
  INACTIVE: "crimson"
};

interface Props extends WithStyles<typeof styles> {
  timestamp: string | null;
  status: string | null;
}

function StatusIndicator(props: Props) {
  const [initialized, setInitialized] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(
    () => {
      if (initialized) {
        setAnimate(true);
        const id = setTimeout(() => {
          setAnimate(false);
        }, 500);
        return () => clearTimeout(id);
      } else setInitialized(true);
    },
    [props.timestamp, props.status]
  );

  return (
    <Icon
      classes={props.classes}
      style={{
        opacity: animate ? 0.5 : 1,
        color: colorLookup[props.status || "INACTIVE"]
      }}
    >
      lens
    </Icon>
  );
}

export default withStyles(styles)(StatusIndicator);
