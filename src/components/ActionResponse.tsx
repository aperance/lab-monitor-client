import * as React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

interface Props {
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
        <IconButton color="inherit" onClick={props.handleClose}>
          <CloseIcon />
        </IconButton>
      }
    />
  );
}

export default ActionResponse;
