/**
 *
 * @packageDocumentation
 */

import React from "react";
import {useDispatch} from "react-redux";
import {Snackbar, IconButton} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import {deviceCommandResponse} from "../redux/actionCreators";
import {useSelector} from "../hooks/useSelector";

const ActionResponse = () => {
  /** Accumulated responses from target devices for recent action. */
  const results = useSelector(state => state.deviceResponse.command.results);
  const err = useSelector(state => state.deviceResponse.command.err);
  const dispatch = useDispatch();

  /** Pending response message cleared when called. */
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
