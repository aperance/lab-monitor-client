import React, { Component } from "react";
import { connect } from "react-redux";
import { singleRowSelect, multiRowSelect } from "../actions/actionCreators";
import AssetTable from "../components/AssetTable";

const mapStateToProps = state => {
  return {
    columns: state.configuration.columns,
    selectedFilters: state.userSelection.filters,
    selected: state.userSelection.rows,
    tableData: state.tableData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleRowClick: (e, id) => {
      if (e.altKey || e.ctrlKey) dispatch(multiRowSelect(id));
      else dispatch(singleRowSelect(id));
    }
  };
};

class AssetTableContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortProperty: null,
      sortDirection: "desc"
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // Use first column as default sort by property.
    // Only set if not already set, and column data is known.
    if (!prevState.sortProperty && nextProps.columns[0])
      return {
        sortProperty: nextProps.columns[0].property,
        sortDirection: "desc"
      };
    else return null;
  }

  changeSorting(property) {
    this.setState({
      sortProperty: property,
      sortDirection:
        this.state.sortProperty !== property
          ? "desc"
          : this.state.sortDirection === "desc"
            ? "asc"
            : "desc"
    });
  }

  sortAndFilter(tableData) {
    return Object.entries(tableData)
      .filter(([rowId, rowData]) =>
        Object.entries(this.props.selectedFilters).every(
          ([property, regexArray]) =>
            !regexArray.every(regex => !rowData[property].match(regex)) ||
            regexArray.length === 0
        )
      )
      .sort((key1, key2) => {
        const prop = this.state.sortProperty;
        let result = (key1[1][prop] || "") > (key2[1][prop] || "");
        if (this.state.sortDirection === "asc") result = !result;
        return result ? 1 : -1;
      });
  }

  render() {
    return (
      <AssetTable
        tableData={this.sortAndFilter(this.props.tableData)}
        columns={this.props.columns}
        selected={this.props.selected}
        sortProperty={this.state.sortProperty}
        sortDirection={this.state.sortDirection}
        changeSorting={this.changeSorting.bind(this)}
        handleRowClick={this.props.handleRowClick.bind(this)}
      />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssetTableContainer);
