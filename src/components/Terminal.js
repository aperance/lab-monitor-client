import React, { Component } from "react";
import Paper from "material-ui/Paper";
import { withStyles } from "material-ui/styles";

const styles = theme => ({
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

class Terminal extends Component {
  render() {
    return (
      <Paper className={this.props.classes.paper} elevation={8} square={true}>
        <pre className={this.props.classes.pre}>{this.props.output}</pre>
      </Paper>
    );
  }
}

export default withStyles(styles)(Terminal);
