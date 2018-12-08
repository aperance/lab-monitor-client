import * as React from "react";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import { CircularProgress } from "@material-ui/core";

const styles = createStyles({
  root: {
    height: "90vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  spinner: { color: "#2196f3" }
});

interface Props extends WithStyles<typeof styles> {}

const Spinner = (props: Props) => {
  return (
    <span className={props.classes.root}>
      <CircularProgress className={props.classes.spinner} size={60} />
    </span>
  );
};

const memoizedSpinner = React.memo(Spinner);

export default withStyles(styles)(memoizedSpinner);
