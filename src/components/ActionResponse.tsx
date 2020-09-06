import React from "react";
import { Snackbar, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import { useSelector, useDispatch } from "../redux/store";
import { deviceCommandResponse } from "../redux/actionCreators";

/**
 * Popup element to display the result of requests sent to devices.
 * Wrapper around MUI snackbar element.
 */
const ActionResponse = (): JSX.Element => {
  /** Accumulated responses from target devices for recent action. */
  const result = useSelector((state) => state.deviceResponse.command);
  const dispatch = useDispatch();

  /** Trigger action to clear pending message from store. */
  const handleClose = () =>
    dispatch(deviceCommandResponse({ err: null, ack: null }));

  let message: string | null = null;
  if (result.err) message = `ERROR: ${result.err}`;
  else if (result.ack === true)
    message = "Request successfuly received by device(s).";
  else if (result.ack === false)
    message = "Request sent but not acknowledged. Please manually confirm.";

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center"
      }}
      open={message !== null}
      autoHideDuration={6000}
      onClose={handleClose}
      message={<span id="message-id">{message}</span>}
      action={
        <IconButton color="inherit" onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      }
    />
  );
};

export default ActionResponse;
