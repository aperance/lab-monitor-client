import React, { Component } from "react";
import { connect } from "react-redux";
import NavBar from "./NavBar";
import AssetTable from "./AssetTable";
import Drawer from "./Drawer";
import Toolbar from "./Toolbar";
import DetailsList from "./DetailsList";
import WebPage from "./WebPage";

class Layout extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <div style={{ paddingTop: "64px" }}>
          <AssetTable />
          <Drawer width="150px" offset={this.props.drawer1offset}>
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
    drawer1offset = "-150px";
    drawer2offset = "-650px";
    drawer2Contents = null;
  } else if (state.selected.length !== 1 || !state.subView) {
    drawer1offset = "0px";
    drawer2offset = "-500px";
    drawer2Contents = null;
  } else {
    drawer1offset = "500px";
    drawer2offset = "0px";
    if (state.subView === "details") drawer2Contents = <DetailsList />;
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
