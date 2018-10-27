import * as React from "react";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import MouseTracker from "./MouseTracker";
import ToolbarContainer from "../containers/ToolbarContainer";
import HistoryContainer from "../containers/HistoryContainer";
import WebPageContainer from "../containers/WebPageContainer";
import PsToolsContainer from "../containers/PsToolsContainer";
import VncContainer from "../containers/VncContainer";

const styles = createStyles({
  drawer: {
    position: "fixed",
    height: "100%",
    top: "0px",
    overflowY: "hidden",
    backgroundColor: "rgba(255, 255, 255, 1)",
    boxShadow: `-2px 0px 4px -1px rgba(0, 0, 0, 0.2),
      -4px 0px 5px 0px rgba(0, 0, 0, 0.14),
      -1px 0px 10px 0px rgba(0, 0, 0, 0.12)`
  },
  dragBar: {
    position: "fixed",
    height: "100%",
    width: "10px",
    top: "0px",
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
  subView: string | null;
  drawersVisible: number;
}

const Drawers = (props: Props) => (
  <MouseTracker>
    {injectedProps => (
      <>
        <div
          className={props.classes.drawer}
          style={{
            width: "200px",
            right:
              [-200, 0, injectedProps.subViewWidth][props.drawersVisible] +
              "px",
            transition: injectedProps.isDragging ? "0s" : ".5s"
          }}
        >
          <ToolbarContainer />
        </div>
        <div
          className={props.classes.dragBar}
          style={{
            right:
              [-200, 0, injectedProps.subViewWidth][props.drawersVisible] -
              5 +
              "px",
            transition: injectedProps.isDragging ? "0s" : ".5s"
          }}
          onMouseDown={injectedProps.startDrag}
        >
          <Icon className={props.classes.icon}>drag_indicator</Icon>
        </div>
        <div
          className={props.classes.drawer}
          style={{
            width: injectedProps.subViewWidth + "px",
            right:
              [
                -(200 + injectedProps.subViewWidth),
                -injectedProps.subViewWidth,
                0
              ][props.drawersVisible] + "px",
            transition: injectedProps.isDragging ? "0s" : ".5s"
          }}
        >
          {props.subView &&
            ((): any => {
              switch (props.subView) {
                case "history":
                  return <HistoryContainer />;
                case "statePage":
                  return !injectedProps.isDragging ? (
                    <WebPageContainer />
                  ) : null;
                case "psTools":
                  return <PsToolsContainer />;
                case "vnc":
                  return !injectedProps.isDragging ? <VncContainer /> : null;
                default:
                  return null;
              }
            })()}
        </div>
      </>
    )}
  </MouseTracker>
);

export default withStyles(styles)(Drawers);
