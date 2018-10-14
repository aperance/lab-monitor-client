import * as React from "react";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import BackIcon from "@material-ui/icons/ArrowBack";
import RefreshIcon from "@material-ui/icons/Refresh";
import SaveIcon from "@material-ui/icons/Save";
import NewWindowIcon from "@material-ui/icons/OpenInNew";

const styles = createStyles({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  icon: {
    marginLeft: -12,
    marginRight: 20
  }
});

interface Props extends WithStyles<typeof styles> {
  url: string | null;
}

class WebPage extends React.Component<Props> {
  public frameRefresh() {
    const frame = document.getElementById("qqq") as HTMLIFrameElement;
    if (frame.contentWindow !== null) frame.contentWindow.history.back();
  }

  public render() {
    return (
      this.props.url && (
        <>
          <Toolbar className={this.props.classes.root}>
            <IconButton color="inherit" className={this.props.classes.icon}>
              <BackIcon />
            </IconButton>
            <IconButton
              color="inherit"
              className={this.props.classes.icon}
              onClick={() => this.frameRefresh()}
            >
              <RefreshIcon />
            </IconButton>
            <Typography
              variant="subheading"
              color="inherit"
              className={this.props.classes.grow}
            >
              Logs for asset 9999
            </Typography>
            <IconButton color="inherit" className={this.props.classes.icon}>
              <SaveIcon />
            </IconButton>
            <IconButton color="inherit" className={this.props.classes.icon}>
              <NewWindowIcon />
            </IconButton>
          </Toolbar>
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
