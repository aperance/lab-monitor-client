import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";

const styles = theme => ({
  root: {
    fontSize: "15px",
    transition: "opacity 0.5s",
    paddingTop: "2px"
  }
});

const colorLookup = {
  CONNECTED: "mediumseagreen",
  RETRY: "mediumseagreen",
  DISCONNECTED: "rgb(239, 239, 35)",
  INACTIVE: "crimson"
};

class StatusIndicator extends Component {
  constructor(props) {
    super(props);
    this.state = { animate: false };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!this.state.animate && prevProps.timestamp !== this.props.timestamp) {
      setTimeout(() => {
        this.setState({ animate: false });
      }, 500);
      this.setState({ animate: true });
    }
  }

  render() {
    return (
      <Icon
        classes={this.props.classes}
        style={{
          opacity: this.state.animate ? 0.5 : 1,
          color: colorLookup[this.props.status]
        }}
      >
        lens
      </Icon>
    );
  }
}

export default withStyles(styles)(StatusIndicator);
