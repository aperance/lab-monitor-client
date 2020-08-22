/**
 *
 * @packageDocumentation
 */

import React from "react";
import {Snackbar, IconButton} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import {useSelector, useDispatch} from "../redux/store";
import {deviceCommandResponse} from "../redux/actionCreators";

const ActionResponse = (): JSX.Element => {
  /** Accumulated responses from target devices for recent action. */
  const results = useSelector(state => state.deviceResponse.command.results);
  const err = useSelector(state => state.deviceResponse.command.err);
  const dispatch = useDispatch();

  /** Trigger action to clear pending message from store. */
  const handleClose = () =>
    dispatch(deviceCommandResponse({err: null, results: null}));

  let message: string | null = null;

  if (err) message = "ERROR: " + err;
  else if (results !== null)
    message = results.every(result => result.success === true)
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
