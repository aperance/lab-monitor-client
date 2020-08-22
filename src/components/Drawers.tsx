/**
 *
 * @packageDocumentation
 */

import React from "react";
import {makeStyles} from "@material-ui/core";

import {useResizer} from "../hooks/useResizer";
import {useSelector} from "../redux/store";

type Props = {
  leftDrawer: JSX.Element;
  rightDrawer: JSX.Element | null;
};

type StyleProps = {
  width: number;
  transform: number;
};

/** CSS-in-JS styling */
const useStyles = makeStyles({
  root: {
    width: (props: StyleProps) => `${props.width}px`,
    transform: (props: StyleProps) => `translateX(${props.transform}px)`,
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
      -1px 0px 10px 0px rgba(0, 0, 0, 0.12)`,
    "&:first-child": {
      flexGrow: 0
    },
    "&:last-child": {
      flexGrow: 1
    }
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

const Drawers = (props: Props): JSX.Element => {
  /** Current sub view width and function to start resize by dragging */
  const [viewWidth, triggerResize] = useResizer(800);
  /** Number of drawers that should be visible to the user. */
  const drawersVisible = useSelector((state): 0 | 1 | 2 => {
    if (state.userSelection.rows.length === 0) return 0;
    return state.userSelection.view ? 2 : 1;
  });
  /** Generated CSS class names */
  const classes = useStyles({
    /** Full drawer width (sub view width plus toolbar width) */
    width: viewWidth + 200,
    /** Convert drawersVisible to px amount that should be shifted off screen */
    transform: [viewWidth + 200, viewWidth, 0][drawersVisible]
  });

  return (
    <div className={classes.root}>
      <div className={classes.drawer}>{props.leftDrawer}</div>
      <div
        className={classes.dragBar}
        role="dragbar"
        onMouseDown={triggerResize}
      />
      <div className={classes.drawer}>{props.rightDrawer}</div>
    </div>
  );
};

export default Drawers;
