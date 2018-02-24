import React, { Component } from "react";
import { connect } from "react-redux";
import NavBar from "./NavBar";
import AssetTable from "./AssetTable";
import Drawer from "./Drawer";
import Toolbar from "./Toolbar";
import DetailsList from "./DetailsList";

class Layout extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <AssetTable />
        <Drawer width={this.props.drawers[0]} offset={this.props.drawers[1]}>
          <Toolbar />
        </Drawer>
        <Drawer width={this.props.drawers[1]} offset="0px">
          <DetailsList />
        </Drawer>
      </div>
    );
  }
}

const mapStateToProps = state => {
  switch (state.selected.length) {
    case 0:
      return { drawers: ["0px", "0px"] };
    case 1:
      return { drawers: ["50px", "500px"] };
    default:
      return { drawers: ["50px", "0px"] };
  }
};

export default connect(mapStateToProps)(Layout);
//export default App;
