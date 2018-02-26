import React, { Component } from "react";

class WebPage extends Component {
  render() {
    return (
      <iframe
        src={"http://" + this.props.target}
        title="iframe"
        width="100%"
        height="100%"
        style={{ borderWidth: "0px" }}
      >
        <p>Your browser does not support iframes.</p>
      </iframe>
    );
  }
}

export default WebPage;
