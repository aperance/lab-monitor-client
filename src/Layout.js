import React, { Component } from "react";
import NavBar from "./components/NavBar";
import AssetTableContainer from "./containers/AssetTableContainer";
import DrawerContainer from "./DrawerContainer";

class Layout extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <div style={{ paddingTop: "64px" }}>
          <AssetTableContainer />
          <DrawerContainer />
        </div>
      </div>
    );
  }
}

export default Layout;
