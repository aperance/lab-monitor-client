import * as React from "react";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

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

class Terminal extends React.Component<Props> {
  public render() {
    return (
      <Paper className={this.props.classes.paper} elevation={8} square={true}>
        <pre className={this.props.classes.pre}>{this.props.output}</pre>
      </Paper>
    );
  }
}

export default withStyles(styles)(Terminal);
