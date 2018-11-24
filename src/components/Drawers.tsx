import * as React from "react";
// @ts-ignore
import { makeStyles } from "@material-ui/styles";
import { useMouseTracker } from "../hooks/useMouseTracker";

const useStyles = makeStyles({
  root: {
    height: "100%",
    top: "0px",
    right: "0px",
    position: "fixed",
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
    zIndex: 5,
    cursor: "col-resize"
  },
  icon: {
    position: "absolute",
    top: "45%",
    marginLeft: "3px",
    fontSize: "13px"
  }
});

interface Props {
  drawersVisible: number;
  children: Array<JSX.Element | null>;
}

function Drawers(props: Props) {
  const classes = useStyles();
  const [ref, subViewWidth, isDragging, setDragging] = useMouseTracker();

  return (
    <div
      ref={ref}
      className={classes.root}
      draggable={false}
      style={{
        transitionDelay:
          isDragging || props.drawersVisible !== 2 ? "0s" : ".2s",
        width: 200 + subViewWidth + "px",
        transform:
          "translateX(" +
          [200 + subViewWidth, subViewWidth, 0][props.drawersVisible] +
          "px)"
      }}
    >
      <div className={classes.drawer} draggable={false} style={{ flexGrow: 0 }}>
        {props.children[0]}
      </div>
      <div
        className={classes.dragBar}
        onMouseDown={() => setDragging(true)}
        draggable={false}
      />
      <div className={classes.drawer} draggable={false} style={{ flexGrow: 1 }}>
        {props.children[1]}
      </div>
    </div>
  );
}

export default Drawers;
