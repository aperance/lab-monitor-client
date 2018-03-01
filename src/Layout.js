import React, { Component } from "react";
import { connect } from "react-redux";
import NavBar from "./NavBar";
import AssetTable from "./AssetTable";
import Drawers from "./Drawer";
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
          <Drawers childrenVisible={this.props.drawersVisible}>
            <Toolbar />
            {this.props.drawer2Contents}
          </Drawers>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  let drawer2Contents, drawersVisible;
  if (state.selected.rows.length === 0) {
    drawersVisible = 0;
    drawer2Contents = null;
  } else if (!state.selected.view) {
    // If no view selected, or multiple assets selected, show only toolbar on screen.
    drawersVisible = 1;
    drawer2Contents = null;
  } else {
    // If view selected, and single asset selected, move both drawers on screen.
    drawersVisible = 2;
    // Fill in drawer contents based on selected view.
    if (state.selected.view === "history") drawer2Contents = <History />;
    else if (state.selected.view === "logsPage")
      drawer2Contents = (
        <WebPage
          target={state.selected.rows[0] + state.configuration.logsPath}
        />
      );
    else if (state.selected.view === "statePage")
      drawer2Contents = (
        <WebPage
          target={state.selected.rows[0] + state.configuration.statePath}
        />
      );
    else drawer2Contents = null;
  }
  return { drawer2Contents, drawersVisible };
};

export default connect(mapStateToProps)(Layout);
