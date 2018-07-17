import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import FilterBar from "./FilterBar";
import AssetTableHead from "./AssetTableHead";
import AssetTableBody from "./AssetTableBody";

const styles = theme => ({
  root: { paddingTop: "68px", display: "flex", overflowX: "hidden" },
  table: {
    whiteSpace: "nowrap",
    margin: "0px 16px"
  },
  button: {
    padding: "0px 4px 4px 4px",
    minWidth: "12px",
    minHeight: "12px"
  },
  icon: {
    height: "auto",
    width: "auto",
    fontSize: "0.75rem"
  }
});

class AssetTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sort: {
        by: null,
        reverse: false
      },
      selectedFilters: {}
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

  changeFiltering(property, regex) {
    const regexArray = this.state.selectedFilters[property] || [];
    const currentIndex = regexArray.indexOf(regex);
    currentIndex === -1
      ? regexArray.push(regex)
      : regexArray.splice(currentIndex, 1);
    this.setState({
      selectedFilters: { ...this.state.selectedFilters, [property]: regexArray }
    });
  }

  sortAndFilter(tableData) {
    return Object.entries(tableData)
      .filter(([rowId, rowData]) =>
        Object.entries(this.state.selectedFilters).every(
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
      <div className={this.props.classes.root}>
        <FilterBar
          filters={this.props.filters}
          selectedFilters={this.state.selectedFilters}
          handleCheckboxClick={this.changeFiltering.bind(this)}
        />
        <Table className={this.props.classes.table}>
          <AssetTableHead
            columns={this.props.columns}
            sort={this.state.sort}
            changeSorting={this.changeSorting.bind(this)}
          />
          <AssetTableBody
            columns={this.props.columns}
            tableData={this.sortAndFilter(this.props.tableData)}
            selected={this.props.selected}
            handleRowClick={this.props.handleRowClick}
          />
        </Table>
      </div>
    );
  }
}

export default withStyles(styles)(AssetTable);
