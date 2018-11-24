import * as React from "react";
// @ts-ignore
import { makeStyles } from "@material-ui/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles({
  root: {
    height: "90vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
});

function Spinner() {
  const classes = useStyles();

  return (
    <span className={classes.root}>
      <CircularProgress size={60} />
    </span>
  );
}

export default React.memo(Spinner);
