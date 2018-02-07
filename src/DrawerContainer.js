import React, { Component } from "react";
import Drawer from "material-ui/Drawer";

class DrawerContainer extends Component {
  render() {
    return (
      <div>
        <Drawer
          containerClassName="container"
          width={400}
          openSecondary={true}
          open={true}
        >
          A
        </Drawer>
        <Drawer
          containerClassName="container"
          width={200}
          openSecondary={true}
          open={false}
        >
          B
        </Drawer>
      </div>
    );
  }
}

export default DrawerContainer;
