import React, { Component } from "react";
import { connect } from "react-redux";
import NavBar from "./NavBar";
import AssetTable from "./AssetTable";
import Drawer from "./Drawer";
import Toolbar from "./Toolbar";
import DetailsList from "./DetailsList";
import Logs from "./Logs";

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = { drawerContents: "details" };
  }

  render() {
    return (
      <div>
        <NavBar />
        <div style={{ paddingTop: "64px" }}>
          <AssetTable />
          <Drawer width="100px" offset={this.props.drawer1offset}>
            <Toolbar />
          </Drawer>
          <Drawer width="500px" offset={this.props.drawer2offset}>
            {this.state.drawerContents === "details" && <DetailsList />}
            {/* {this.state.drawerContents === "htmlOnly" && <HtmlOnly />} */}
            {this.state.drawerContents === "logs" && <Logs />}
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
        drawer2offset: "-600px"
      };
    case 1:
      return {
        drawer1offset: "500px",
        drawer2offset: "0px"
      };
    default:
      return {
        drawer1offset: "0px",
        drawer2offset: "-500px"
      };
  }
};

export default connect(mapStateToProps)(Layout);
