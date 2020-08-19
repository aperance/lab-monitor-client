import React from "react";
import {makeStyles} from "@material-ui/core";

import {useResizer} from "../hooks/useResizer";

type Props = {
  drawersVisible: 0 | 1 | 2;
  leftDrawer: JSX.Element;
  rightDrawer: JSX.Element | null;
  isResizing: (x: boolean) => void;
};

/**
 * CSS-in-JS styling.
 * @hidden
 */
const useStyles = makeStyles({
  root: {
    height: "100%",
    top: "0px",
    right: "0px",
    position: "fixed",
    zIndex: 10,
    display: "flex",
    transition: "transform 400ms cubic-bezier(0, 0, 0.2, 1)"
  },
  drawer: {
    width: "200px",
    userSelect: "none",
    height: "100%",
    top: "0px",
    overflowY: "hidden",
    backgroundColor: "rgba(255, 255, 255, 1)",
    boxShadow: `-2px 0px 4px -1px rgba(0, 0, 0, 0.2),
      -4px 0px 5px 0px rgba(0, 0, 0, 0.14),
      -1px 0px 10px 0px rgba(0, 0, 0, 0.12)`
  },
  dragBar: {
    height: "100%",
    width: "10px",
    top: "0px",
    left: "195px",
    position: "absolute",
    zIndex: 20,
    cursor: "col-resize"
  },
  icon: {
    position: "absolute",
    top: "45%",
    marginLeft: "3px",
    fontSize: "13px"
  }
});

/**
 *
 */
const Drawers = (props: Props) => {
  const classes = useStyles();
  const [viewWidth, triggerResize] = useResizer(800, props.isResizing);

  const width = viewWidth + 200;
  const translateX = [width, viewWidth, 0][props.drawersVisible];

  return (
    <div
      className={classes.root}
      style={{width: `${width}px`, transform: `translateX(${translateX}px)`}}
    >
      <div className={classes.drawer} style={{flexGrow: 0}}>
        {props.leftDrawer}
      </div>
      <div
        className={classes.dragBar}
        role="dragbar"
        onMouseDown={triggerResize}
      />
      <div className={classes.drawer} style={{flexGrow: 1}}>
        {props.rightDrawer}
      </div>
    </div>
  );
};

export default Drawers;
