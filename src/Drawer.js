import React, { Component } from "react";

class Drawer extends Component {
  render() {
    return (
      <div
        style={{
          height: "calc(100% - 64px)",
          top: "64px",
          position: "fixed",
          zIndex: "1",
          overflowX: "hidden",
          transition: ".5s",
          paddingTop: "0px",
          backgroundColor: "white",
          boxShadow:
            "-2px 0px 4px -1px rgba(0, 0, 0, 0.2), -4px 0px 5px 0px rgba(0, 0, 0, 0.14), -1px 0px 10px 0px rgba(0, 0, 0, 0.12)",
          width: this.props.width,
          right: this.props.offset
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Drawer;
