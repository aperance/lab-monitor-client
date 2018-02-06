import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import NavBar from "./NavBar";

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <NavBar />
        <h1>Test</h1>
      </MuiThemeProvider>
    );
  }
}

export default App;
