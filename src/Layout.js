import React, { Component } from "react";
import { connect } from "react-redux";
import NavBar from "./NavBar";
import AssetTable from "./AssetTable";
import Drawer from "./Drawer";
import Toolbar from "./Toolbar";
import History from "./History";
import WebPage from "./WebPage";

class Layout extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <div style={{ paddingTop: "64px" }}>
          <AssetTable />
          <Drawer width="200px" offset={this.props.drawer1offset}>
            <Toolbar />
          </Drawer>
          <Drawer width="500px" offset={this.props.drawer2offset}>
            {this.props.drawer2Contents}
          </Drawer>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  let drawer2Contents, drawer1offset, drawer2offset;
  if (state.selected.length === 0) {
    // If no assets selected, move both drawers off screen.
    drawer1offset = "-200px";
    drawer2offset = "-700px";
    drawer2Contents = null;
  } else if (!state.subView || state.selected.length !== 1) {
    // If no view selected, or multiple assets selected, show only toolbar on screen.
    drawer1offset = "0px";
    drawer2offset = "-500px";
    drawer2Contents = null;
  } else {
    // If view selected, and single asset selected, move both drawers on screen.
    drawer1offset = "500px";
    drawer2offset = "0px";
    // Fill in drawer contents based on selected view.
    if (state.subView === "history") drawer2Contents = <History />;
    else if (state.subView === "logsPage")
      drawer2Contents = (
        <WebPage target={state.selected[0] + state.configuration.logsPath} />
      );
    else if (state.subView === "statePage")
      drawer2Contents = (
        <WebPage target={state.selected[0] + state.configuration.statePath} />
      );
    else drawer2Contents = null;
  }
  return { drawer1offset, drawer2offset, drawer2Contents };
};

export default connect(mapStateToProps)(Layout);