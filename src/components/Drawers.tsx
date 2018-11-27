import * as React from "react";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import { useMouseTracker } from "../hooks/useMouseTracker";

const styles = createStyles({
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

interface Props extends WithStyles<typeof styles> {
  drawersVisible: number;
  children: Array<JSX.Element | null>;
}

const Drawers = (props: Props) => {
  const [subViewWidth, isDragging, setDragging] = useMouseTracker();

  return (
    <div
      className={props.classes.root}
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
      <div className={props.classes.drawer} style={{ flexGrow: 0 }}>
        {props.children[0]}
      </div>
      <div
        className={props.classes.dragBar}
        onMouseDown={() => setDragging(true)}
      />
      <div className={props.classes.drawer} style={{ flexGrow: 1 }}>
        {props.children[1]}
      </div>
    </div>
  );
};

export default withStyles(styles)(Drawers);
