import * as React from "react";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";

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
  subViewWidth: number;
  drawersVisible: number;
  isDragging: boolean;
  children: React.Component[];
  startDrag: () => void;
}

class Drawers extends React.Component<Props> {
  public render() {
    return (
      <div>
        <div
          className={this.props.classes.drawer}
          style={{
            width: "200px",
            right:
              [-200, 0, this.props.subViewWidth][this.props.drawersVisible] +
              "px",
            transition: this.props.isDragging ? "0s" : ".5s"
          }}
        >
          {this.props.children[0]}
        </div>
        <div
          className={this.props.classes.dragBar}
          style={{
            right:
              [-200, 0, this.props.subViewWidth][this.props.drawersVisible] -
              5 +
              "px",
            transition: this.props.isDragging ? "0s" : ".5s"
          }}
          onMouseDown={this.props.startDrag}
        >
          <Icon className={this.props.classes.icon}>drag_indicator</Icon>
        </div>
        <div
          className={this.props.classes.drawer}
          style={{
            width: this.props.subViewWidth + "px",
            right:
              [-(200 + this.props.subViewWidth), -this.props.subViewWidth, 0][
                this.props.drawersVisible
              ] + "px",
            transition: this.props.isDragging ? "0s" : ".5s"
          }}
        >
          {this.props.children[1]}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Drawers);
