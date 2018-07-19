import React, { Component } from "react";
import Icon from "@material-ui/core/Icon";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  drawer: {
    position: "fixed",
    height: "calc(100% - 0px)",
    top: "0px",
    overflowY: "hidden",
    backgroundColor: "rgba(255, 255, 255, 1)",
    boxShadow: [
      "-2px 0px 4px -1px rgba(0, 0, 0, 0.2)",
      "-4px 0px 5px 0px rgba(0, 0, 0, 0.14)",
      "-1px 0px 10px 0px rgba(0, 0, 0, 0.12)"
    ]
  }
});

class Drawers extends Component {
  render() {
    const {
      visible,
      subViewWidth,
      classes,
      children,
      transition,
      onClick
    } = this.props;
    return (
      <div>
        <div
          className={classes.drawer}
          style={{
            width: "200px",
            right: [-200, 0, subViewWidth][visible] + "px",
            transition: transition
          }}
        >
          {children[0]}
        </div>
        <div
          className={classes.drawer}
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.21)",
            alignSelf: "stretch",
            cursor: "col-resize",
            width: "10px",
            right: [-200, 0, subViewWidth][visible] - 5 + "px",
            transition: transition,
            zIndex: 5
          }}
          onMouseDown={onClick}
        >
          <Icon>drag_indicator</Icon>
        </div>
        <div
          className={classes.drawer}
          style={{
            width: subViewWidth + "px",
            right: [-(200 + subViewWidth), -subViewWidth, 0][visible] + "px",
            transition: transition
          }}
        >
          {this.props.children[1]}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Drawers);
