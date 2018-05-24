import React, { Component } from "react";
import NavBar from "./components/NavBar";
import AssetTableContainer from "./containers/AssetTableContainer";
import DrawersContainer from "./containers/DrawersContainer";
import LogLevelContainer from "./containers/LogLevelContainer";
import ActionResponseContainer from "./containers/ActionResponseContainer";

class Layout extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <AssetTableContainer />
        <DrawersContainer />
        <LogLevelContainer />
        <ActionResponseContainer />
      </div>
    );
  }
}

export default Layout;
