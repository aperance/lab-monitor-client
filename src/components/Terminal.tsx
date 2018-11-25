import * as React from "react";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import { Paper } from "@material-ui/core";

const styles = createStyles({
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

interface Props extends WithStyles<typeof styles> {
  output?: string;
}

const Terminal = (props: Props) => {
  return (
    <Paper className={props.classes.paper} elevation={8} square={true}>
      <pre className={props.classes.pre}>{props.output}</pre>
    </Paper>
  );
};

export default withStyles(styles)(Terminal);
