import * as React from "react";
import { useState, useEffect } from "react";
// @ts-ignore
import { makeStyles } from "@material-ui/styles";
import Icon from "@material-ui/core/Icon";

const useStyles = makeStyles({
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

interface Props {
  timestamp: string | null;
  status: string | null;
}

const StatusIndicator = (props: Props) => {
  const classes = useStyles();
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
      classes={classes}
      style={{
        opacity: animate ? 0.5 : 1,
        color: colorLookup[props.status || "INACTIVE"]
      }}
    >
      lens
    </Icon>
  );
};

export { StatusIndicator };
