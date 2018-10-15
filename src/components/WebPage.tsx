import * as React from "react";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";

const styles = createStyles({});

interface Props extends WithStyles<typeof styles> {
  url: string | null;
}

class WebPage extends React.Component<Props> {
  public render() {
    return (
      this.props.url && (
        <iframe
          src={this.props.url}
          id="qqq"
          title="iframe"
          width="100%"
          height="100%"
          style={{ borderWidth: "0px" }}
        >
          <p>Your browser does not support iframes.</p>
        </iframe>
      )
    );
  }
}

export default withStyles(styles)(WebPage);
