import * as React from "react";
import { createStyles, Theme, WithStyles, withStyles } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const styles = (theme: Theme) =>
  createStyles({
    close: {
      width: theme.spacing.unit * 4,
      height: theme.spacing.unit * 4
    }
  });

interface Props extends WithStyles<typeof styles> {
  message: string | null;
  handleClose: () => void;
}

const ActionResponse = (props: Props) => (
  <Snackbar
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center"
    }}
    open={props.message ? true : false}
    autoHideDuration={6000}
    onClose={props.handleClose}
    message={<span id="message-id">{props.message}</span>}
    action={
      <IconButton
        color="inherit"
        className={props.classes.close}
        onClick={props.handleClose}
      >
        <CloseIcon />
      </IconButton>
    }
  />
);

export default withStyles(styles)(ActionResponse);
