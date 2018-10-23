import * as React from "react";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import OpenIcon from "@material-ui/icons/OpenInNew";

const styles = createStyles({
  button: {
    position: "absolute",
    right: "18px",
    top: "18px",
    backgroundColor: "white",
    opacity: 0.5
  }
});

interface Props extends WithStyles<typeof styles> {
  url: string | null;
}

class WebPage extends React.Component<Props> {
  public render() {
    return (
      this.props.url && (
        <>
          <Button
            variant="fab"
            mini={true}
            className={this.props.classes.button}
            href={this.props.url}
            target="_blank"
          >
            <OpenIcon />
          </Button>
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
        </>
      )
    );
  }
}

export default withStyles(styles)(WebPage);
