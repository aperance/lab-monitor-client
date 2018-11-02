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
  err: Error | null;
  results: any[] | null;
  handleClose: () => void;
}

function ActionResponse(props: Props) {
  let message: string | null = null;

  if (props.err !== null) message = "ERROR: " + props.err.message;
  else if (props.results !== null)
    message = props.results.every(result => result.success === true)
      ? "Request successfuly received by device(s)."
      : "Request sent but not acknowledged by every device. Please manually confirm.";

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center"
      }}
      open={message ? true : false}
      autoHideDuration={6000}
      onClose={props.handleClose}
      message={<span id="message-id">{message}</span>}
      action={
        <IconButton
          color="inherit"
          className={props.classes.close}
          onClick={props.handleClose}
        >
          <CloseIcon />
        </IconButton>
      }
    />
  );
}

export default withStyles(styles)(ActionResponse);
