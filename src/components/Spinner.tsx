import * as React from "react";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = createStyles({
  root: {
    height: "90vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
});

interface Props extends WithStyles<typeof styles> {}

function Spinner(props: Props) {
  return (
    <span className={props.classes.root}>
      <CircularProgress size={60} />
    </span>
  );
}

export default withStyles(styles)(Spinner);
