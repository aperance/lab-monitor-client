import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import NavBar from "./NavBar";
import AssetTable from "./AssetTable";

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <NavBar />
          <AssetTable />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
