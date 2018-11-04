import * as React from "react";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import { useMouseTracker } from "../hooks/useMouseTracker";

const styles = createStyles({
  root: {
    height: "100%",
    top: "0px",
    position: "fixed"
  },
  drawer: {
    height: "100%",
    top: "0px",
    position: "absolute",
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

interface Props extends WithStyles<typeof styles> {
  drawersVisible: number;
  children: Array<JSX.Element | null>;
}

function Drawers(props: Props) {
  const [ref, subViewWidth, isDragging, setDragging] = useMouseTracker();

  const translateBy = [200 + subViewWidth, subViewWidth, 0][
    props.drawersVisible
  ];

  return (
    <div
      ref={ref}
      className={props.classes.root}
      draggable={false}
      style={{
        width: 200 + subViewWidth + "px",
        right: "0px",
        transform: `translateX(${translateBy}px)`,
        transition: isDragging ? "0s" : "all 400ms cubic-bezier(0, 0, 0.2, 1)",
        transitionDelay: isDragging || props.drawersVisible !== 2 ? "0s" : ".2s"
      }}
    >
      <div
        className={props.classes.drawer}
        draggable={false}
        style={{
          userSelect: "none",
          width: "200px",
          left: "0px"
        }}
      >
        {props.children[0]}
      </div>
      <div
        className={props.classes.dragBar}
        onMouseDown={() => setDragging(true)}
        draggable={false}
      />
      <div
        className={props.classes.drawer}
        draggable={false}
        style={{
          userSelect: "none",
          width: subViewWidth + "px",
          left: "200px"
        }}
      >
        {props.children[1]}
      </div>
    </div>
  );
}

export default withStyles(styles)(Drawers);
