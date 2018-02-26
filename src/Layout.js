import React, { Component } from "react";
import { connect } from "react-redux";
import NavBar from "./NavBar";
import AssetTable from "./AssetTable";
import Drawer from "./Drawer";
import Toolbar from "./Toolbar";
import DetailsList from "./DetailsList";
import WebPage from "./WebPage";

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = { drawer2Contents: "logsPage" };
  }

  render() {
    let drawer2Contents = null;
    if (this.props.drawer2show) {
      switch (this.state.drawer2Contents) {
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
          break;
      }
    }

    return (
      <div>
        <NavBar />
        <div style={{ paddingTop: "64px" }}>
          <AssetTable />
          <Drawer width="100px" offset={this.props.drawer1offset}>
            <Toolbar />
          </Drawer>
          <Drawer width="500px" offset={this.props.drawer2offset}>
            {drawer2Contents}
          </Drawer>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  switch (state.selected.length) {
    case 0:
      return {
        drawer1offset: "-100px",
        drawer2offset: "-600px",
        drawer2show: false
      };
    case 1:
      return {
        drawer1offset: "500px",
        drawer2offset: "0px",
        drawer2show: true,
        logsPath:
          "http://" + state.selected[0] + state.configuration.logsPath || null,
        statePath:
          "http://" + state.selected[0] + state.configuration.statePath || null
      };
    default:
      return {
        drawer1offset: "0px",
        drawer2offset: "-500px",
        drawer2show: false
      };
  }
};

export default connect(mapStateToProps)(Layout);
