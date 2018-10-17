import * as React from "react";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";

const styles = createStyles({
  root: {
    fontSize: "15px",
    transition: "opacity 0.5s",
    paddingTop: "2px"
  }
});

const colorLookup: { [x: string]: string } = {
  CONNECTED: "mediumseagreen",
  RETRY: "mediumseagreen",
  DISCONNECTED: "rgb(239, 239, 35)",
  INACTIVE: "crimson"
};

interface Props extends WithStyles<typeof styles> {
  timestamp: string | null;
  status: string | null;
}

interface State {
  animate: boolean;
}

class StatusIndicator extends React.Component<Props, State> {
  public timeoutId?: NodeJS.Timer;
  public state: State = { animate: false };

  public componentDidUpdate(prevProps: Props) {
    if (!this.state.animate && prevProps.timestamp !== this.props.timestamp) {
      this.timeoutId = setTimeout(() => {
        this.setState({ animate: false });
      }, 500);
      this.setState({ animate: true });
    }
  }

  public componentWillUnmount() {
    if (this.timeoutId) clearTimeout(this.timeoutId);
  }

  public render() {
    return (
      <Icon
        classes={this.props.classes}
        style={{
          opacity: this.state.animate ? 0.5 : 1,
          color: colorLookup[this.props.status || "INACTIVE"]
        }}
      >
        lens
      </Icon>
    );
  }
}

export default withStyles(styles)(StatusIndicator);
