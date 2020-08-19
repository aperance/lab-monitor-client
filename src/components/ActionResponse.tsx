import React from "react";
import {Snackbar, IconButton} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

type Props = {
  /** Accumulated responses from target devices for recent action. */
  response: {err: Error | null; results: {success: boolean}[] | null};
  /** Pending response message cleared when called. */
  handleClose: () => void;
};

/**
 *
 */
const ActionResponse = (props: Props) => {
  let message: string | null = null;

  if (props.response.err !== null) message = "ERROR: " + props.response.err;
  else if (props.response.results !== null)
    message = props.response.results.every(result => result.success === true)
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
};

export default ActionResponse;
