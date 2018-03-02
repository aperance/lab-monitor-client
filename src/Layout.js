import React, { Component } from "react";
import NavBar from "./NavBar";
import AssetTable from "./AssetTable";
import DrawerContainer from "./Drawer";

class Layout extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <div style={{ paddingTop: "64px" }}>
          <AssetTable />
          <DrawerContainer />
        </div>
      </div>
    );
  }
}

export default Layout;
