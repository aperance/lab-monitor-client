/**
 *
 * @packageDocumentation
 */

import React, {useState, useEffect} from "react";
import {makeStyles} from "@material-ui/core";
import Icon from "@material-ui/icons/Lens";

type Props = {
  timestamp: string | null;
  status: string | null;
};

/** CSS-in-JS styling */
const useStyles = makeStyles({
  root: {
    fontSize: "15px",
    transition: "opacity 0.5s",
    paddingTop: "2px"
  }
});

const colorLookup: {[x: string]: string} = {
  CONNECTED: "mediumseagreen",
  RETRY: "mediumseagreen",
  DISCONNECTED: "rgb(239, 239, 35)",
  INACTIVE: "crimson"
};

const StatusIndicator = (props: Props): JSX.Element => {
  /** Generated CSS class names */
  const classes = useStyles();
  const [initialized, setInitialized] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (initialized) {
      setAnimate(true);
      const id = setTimeout(() => {
        setAnimate(false);
      }, 500);
      return () => clearTimeout(id);
    } else setInitialized(true);
  }, [initialized, props.timestamp, props.status]);

  return (
    <Icon
      classes={classes}
      style={{
        opacity: animate ? 0.5 : 1,
        color: colorLookup[props.status || "INACTIVE"]
      }}
    />
  );
};

export default StatusIndicator;
