import React, { Component } from "react";
import Paper from "material-ui/Paper";

class Terminal extends Component {
  render() {
    return (
      <Paper
        elevation={8}
        square={true}
        style={{
          height: "500px",
          width: "100%",
          marginTop: "32px",
          backgroundColor: "black",
          color: "white",
          fontSize: "0.825rem"
        }}
      >
        <pre style={{ padding: "10px 10px 10px 10px", whiteSpace: "pre-wrap" }}>
          {this.props.output}
        </pre>
      </Paper>
    );
  }
}

export default Terminal;
