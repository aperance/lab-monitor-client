import React, { Component } from "react";
import NavBar from "./components/NavBar";
import AssetTableContainer from "./containers/AssetTableContainer";
import DrawersContainer from "./containers/DrawersContainer";
import LogLevelContainer from "./containers/LogLevelContainer";

class Layout extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <div style={{ paddingTop: "64px" }}>
          <AssetTableContainer />
          <DrawersContainer />
        </div>
        <LogLevelContainer />
      </div>
    );
  }
}

export default Layout;
