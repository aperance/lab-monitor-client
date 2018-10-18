import * as React from "react";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

const styles = createStyles({});

interface Props extends WithStyles<typeof styles> {
  message: Error | null;
  handleClose: () => void;
}

class ErrorMessage extends React.Component<Props> {
  public render() {
    return (
      this.props.message && (
        <Dialog open={true} onClose={this.props.handleClose}>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.props.message.name + ": " + this.props.message.message}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleClose} color="primary" autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      )
    );
  }
}

export default withStyles(styles)(ErrorMessage);
