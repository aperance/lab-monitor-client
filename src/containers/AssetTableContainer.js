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
      sort: {
        by: null,
        reverse: false
      }
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // Use first column as default sort by property.
    // Only set if not already set, and column data is known.
    if (!prevState.sort.by && nextProps.columns[0])
      return { sort: { by: nextProps.columns[0].property, reverse: false } };
    else return null;
  }

  changeSorting(property) {
    this.setState({
      sort: {
        by: property,
        reverse:
          this.state.sort.by === property ? !this.state.sort.reverse : false
      }
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
        const prop = this.state.sort.by;
        let result = (key1[1][prop] || "") > (key2[1][prop] || "");
        if (this.state.sort.reverse) result = !result;
        return result ? 1 : -1;
      });
  }

  render() {
    return (
      <AssetTable
        tableData={this.sortAndFilter(this.props.tableData)}
        columns={this.props.columns}
        selected={this.props.selected}
        sort={this.state.sort}
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
