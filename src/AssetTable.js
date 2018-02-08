import React, { Component } from "react";
import { connect } from "react-redux";
import AssetTableHeader from "./AssetTableHeader";
import AssetTableBody from "./AssetTableBody";

class AssetTable extends Component {
  render() {
    return (
      <div>
        <AssetTableHeader header={this.props.header} />
        <AssetTableBody
          rows={this.props.rows}
          rowOrder={this.props.rowOrder}
          selected={this.props.selected}
          handleRowSelect={this.props.handleRowSelect}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    header: state.table.header,
    rows: state.table.rows,
    rowOrder: Object.keys(state.table.rows),
    selected: state.selected
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleRowSelect: selected => {
      dispatch({
        type: "SET_SELECTED",
        selected
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AssetTable);
