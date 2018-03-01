import React, { Component, Children } from "react";

const widths = [200, 600, 600];
const offsets = [
  [-200, -800, -1400],
  [0, -600, -1200],
  [600, 0, -600],
  [1200, 600, 0]
];

class Drawers extends Component {
  render() {
    const children = Children.toArray(this.props.children);
    return (
      <div>
        {Children.map(this.props.children, (child, index) => {
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
                backgroundColor: "rgba(255, 255, 255, 1)",
                boxShadow:
                  "-2px 0px 4px -1px rgba(0, 0, 0, 0.2), -4px 0px 5px 0px rgba(0, 0, 0, 0.14), -1px 0px 10px 0px rgba(0, 0, 0, 0.12)",
                width: widths[index] + "px",
                right: offsets[this.props.childrenVisible][index] + "px"
              }}
            >
              {child}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Drawers;
