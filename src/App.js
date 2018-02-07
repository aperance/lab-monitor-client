import React, { Component } from "react";
import NavBar from "./NavBar";
import AssetTable from "./AssetTable";
import DrawerContainer from "./DrawerContainer";

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <div className="container">
          <AssetTable />
          <DrawerContainer />
        </div>
      </div>
    );
  }
}

export default App;