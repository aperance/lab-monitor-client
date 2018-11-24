import * as React from "react";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

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

<<<<<<< HEAD
export { ErrorMessage };
=======
export default withStyles(styles)(ErrorMessage);
>>>>>>> parent of d52762c... Migrated to material-ui/styles with hooks
