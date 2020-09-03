/**
 *
 * @packageDocumentation
 */

import React from "react";
import { Snackbar, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import { useSelector, useDispatch } from "../redux/store";
import { deviceCommandResponse } from "../redux/actionCreators";

const ActionResponse = (): JSX.Element => {
  /** Accumulated responses from target devices for recent action. */
  const result = useSelector((state) => state.deviceResponse.command);
  const dispatch = useDispatch();

  /** Trigger action to clear pending message from store. */
  const handleClose = () =>
    dispatch(deviceCommandResponse({ err: null, ack: null }));

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center"
      }}
      open={result.err !== null || result.ack !== null}
      autoHideDuration={60000}
      onClose={handleClose}
      message={
        <span id="message-id">
          {result.err !== null
            ? `ERROR: ${result.err}`
            : result.ack
            ? "Request successfuly received by device(s)."
            : "Request sent but not acknowledged by every device. Please manually confirm."}
        </span>
      }
      action={
        <IconButton color="inherit" onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      }
    />
  );
};

export default ActionResponse;
