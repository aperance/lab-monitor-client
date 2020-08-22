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

type StyleProps = {
  status: string | null;
  animate: boolean;
};

/** CSS-in-JS styling */
const useStyles = makeStyles({
  root: {
    fontSize: "15px",
    transition: "opacity 0.5s",
    paddingTop: "2px",
    opacity: (props: StyleProps) => (props.animate ? 0.3 : 1),
    color: (props: StyleProps) => {
      switch (props.status) {
        case "CONNECTED":
          return "mediumseagreen";
        case "RETRY":
          return "mediumseagreen";
        case "DISCONNECTED":
          return "rgb(239, 239, 35)";
        default:
          return "crimson";
      }
    }
  }
});

const StatusIndicator = (props: Props): JSX.Element => {
  const [initialized, setInitialized] = useState(false);
  const [animate, setAnimate] = useState(false);
  /** Generated CSS class names */
  const classes = useStyles({status: props.status, animate});

  useEffect(() => {
    if (initialized) {
      setAnimate(true);
      const id = setTimeout(() => {
        setAnimate(false);
      }, 500);
      return () => clearTimeout(id);
    } else setInitialized(true);
  }, [initialized, props.timestamp, props.status]);

  return <Icon classes={classes} />;
};

export default StatusIndicator;
