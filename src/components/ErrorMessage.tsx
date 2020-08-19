import React from "react";
import {Dialog, DialogContent, DialogContentText} from "@material-ui/core";

type Props = {
  message: string;
};

/**
 *
 */
const ErrorMessage = (props: Props) => {
  return (
    <Dialog open={true}>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {"Error: "}
          {props.message === "connectionError" &&
            "Disconnected from server. See console for further details."}
          {props.message === "dataError" &&
            "Invalid data received. See console for further details."}
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default ErrorMessage;
