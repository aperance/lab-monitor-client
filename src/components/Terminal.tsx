import * as React from "react";
// @ts-ignore
import { makeStyles } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  paper: {
    height: "500px",
    width: "100%",
    marginTop: "32px",
    backgroundColor: "black",
    color: "white",
    fontSize: "0.825rem"
  },
  pre: { padding: "10px 10px 10px 10px", whiteSpace: "pre-wrap" }
});

interface Props {
  output?: string;
}

function Terminal(props: Props) {
  const classes = useStyles();
  return (
    <Paper className={classes.paper} elevation={8} square={true}>
      <pre className={classes.pre}>{props.output}</pre>
    </Paper>
  );
}

export default Terminal;
