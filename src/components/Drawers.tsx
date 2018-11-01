import * as React from "react";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import { useMouseTracker } from "../hooks/useMouseTracker";
import ToolbarContainer from "../containers/ToolbarContainer";
import HistoryContainer from "../containers/HistoryContainer";
import WebPageContainer from "../containers/WebPageContainer";
import PsToolsContainer from "../containers/PsToolsContainer";
import VncContainer from "../containers/VncContainer";

import ErrorBoundary from "./ErrorBoundary";

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
  subView: string | null;
  drawersVisible: number;
}

function Drawers(props: Props) {
  const [ref, subViewWidth, isDragging, setDragging] = useMouseTracker();

  return (
    <div
      ref={ref}
      className={props.classes.root}
      style={{
        width: 200 + subViewWidth + "px",
        right:
          [-(200 + subViewWidth), -subViewWidth, 0][props.drawersVisible] +
          "px",
        transition: isDragging ? "0s" : ".5s"
      }}
    >
      <div
        className={props.classes.drawer}
        style={{ width: "200px", left: "0px" }}
      >
        <ToolbarContainer />
      </div>
      <div
        className={props.classes.dragBar}
        onMouseDown={() => setDragging(true)}
      >
        <Icon className={props.classes.icon}>drag_indicator</Icon>
      </div>
      <div
        className={props.classes.drawer}
        style={{ width: subViewWidth + "px", right: "0px" }}
      >
        <ErrorBoundary key={props.subView || ""}>
          {(() => {
            switch (props.subView) {
              case "history":
                return <HistoryContainer />;
              case "statePage":
                return !isDragging ? <WebPageContainer /> : null;
              case "psTools":
                return <PsToolsContainer />;
              case "vnc":
                return !isDragging ? <VncContainer /> : null;
              default:
                return null;
            }
          })()}
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default withStyles(styles)(Drawers);
