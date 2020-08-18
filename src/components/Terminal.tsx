import React from "react";
import {Paper, makeStyles} from "@material-ui/core";

const useStyles = makeStyles({
  paper: {
    height: "500px",
    width: "100%",
    marginTop: "32px",
    backgroundColor: "black",
    color: "white",
    fontSize: "0.825rem"
  },
  pre: {padding: "10px 10px 10px 10px", whiteSpace: "pre-wrap"}
});

interface Props {
  output: string | null;
}

const Terminal = (props: Props) => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper} elevation={8} square={true}>
      {props.output && <pre className={classes.pre}>{props.output}</pre>}
    </Paper>
  );
};

export default Terminal;
