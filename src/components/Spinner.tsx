/**
 *
 * @packageDocumentation
 */

import React from "react";
import {makeStyles} from "@material-ui/core";
import {CircularProgress} from "@material-ui/core";

/**
 * CSS-in-JS styling.
 * @hidden
 */
const useStyles = makeStyles({
  root: {
    height: "90vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
});

/**
 *
 */
const Spinner = (): JSX.Element => {
  const classes = useStyles();

  return (
    <span className={classes.root}>
      <CircularProgress size={60} />
    </span>
  );
};

export default React.memo(Spinner);
