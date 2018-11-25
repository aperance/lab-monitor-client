import * as React from "react";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import { Dialog, DialogContent, DialogContentText } from "@material-ui/core";

const styles = createStyles({});

interface Props extends WithStyles<typeof styles> {
  message: string;
}

const ErrorMessage = (props: Props) => {
  return (
    <Dialog open={true}>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {props.message}
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default withStyles(styles)(ErrorMessage);
