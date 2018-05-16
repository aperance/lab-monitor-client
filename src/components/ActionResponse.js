import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4
  }
});

class ActionResponse extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        open={this.props.visible}
        autoHideDuration={6000}
        onClose={this.props.handleClose}
        message={<span id="message-id">MESSAGE</span>}
        action={
          <IconButton
            color="inherit"
            className={classes.close}
            onClick={this.props.handleClose}
          >
            <CloseIcon />
          </IconButton>
        }
      />
    );
  }
}

export default withStyles(styles)(ActionResponse);
