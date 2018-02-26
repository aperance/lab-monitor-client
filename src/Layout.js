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
    let drawer2Contents, drawer1offset, drawer2offset;
    if (this.props.drawersVisible === 0) {
      drawer1offset = "-150px";
      drawer2offset = "-650px";
      drawer2Contents = null;
    } else if (this.props.drawersVisible === 1) {
      drawer1offset = "0px";
      drawer2offset = "-500px";
      drawer2Contents = null;
    } else {
      drawer1offset = "500px";
      drawer2offset = "0px";
      switch (this.props.subView) {
        case "details":
          drawer2Contents = <DetailsList />;
          break;
        case "logsPage":
          drawer2Contents = <WebPage target={this.props.logsPath} />;
          break;
        case "statePage":
          drawer2Contents = <WebPage target={this.props.statePath} />;
          break;
        default:
          drawer2Contents = null;
          break;
      }
    }

    return (
      <div>
        <NavBar />
        <div style={{ paddingTop: "64px" }}>
          <AssetTable />
          <Drawer width="150px" offset={drawer1offset}>
            <Toolbar />
          </Drawer>
          <Drawer width="500px" offset={drawer2offset}>
            {drawer2Contents}
          </Drawer>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  let drawersVisible;
  if (state.selected.length === 0) drawersVisible = 0;
  else if (state.selected.length === 1 && state.subView) drawersVisible = 2;
  else drawersVisible = 1;
  return {
    drawersVisible,
    logsPath:
      "http://" + state.selected[0] + state.configuration.logsPath || null,
    statePath:
      "http://" + state.selected[0] + state.configuration.statePath || null,
    subView: state.subView
  };
};

export default connect(mapStateToProps)(Layout);
