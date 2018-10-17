import * as React from "react";
import { createStyles, Theme, WithStyles, withStyles } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const styles = (theme: Theme) =>
  createStyles({
    close: {
      width: theme.spacing.unit * 4,
      height: theme.spacing.unit * 4
    }
  });

interface Props extends WithStyles<typeof styles> {
  message: string | null;
  handleClose: () => void;
}

class ActionResponse extends React.Component<Props> {
  // public shouldComponentUpdate(nextProps: Props) {
  //   if (this.props.visible !== nextProps.visible) return true;
  //   else return false;
  // }

  public render() {
    const { classes } = this.props;
    return (
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        open={this.props.message ? true : false}
        autoHideDuration={6000}
        onClose={this.props.handleClose}
        message={<span id="message-id">{this.props.message}</span>}
        action={
          <IconButton
            color="inherit"
            className={classes.close}
            onClick={this.props.handleClose}
          >
            <CloseIcon />
          </IconButton>
        }
      />
    );
  }
}

export default withStyles(styles)(ActionResponse);
