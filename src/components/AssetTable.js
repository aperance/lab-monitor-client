import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import FilterBar from "./FilterBar";
import AssetTableHead from "./AssetTableHead";
import AssetTableBody from "./AssetTableBody";

const styles = theme => ({
  table: {
    whiteSpace: "nowrap",
    margin: "0px 8px",
    "& thead > tr": { height: "48px" },
    "& th": { paddingRight: "4px", paddingLeft: "12px" },
    "& tbody > tr": { height: "36px" },
    "& td": {
      fontSize: "0.75rem",
      paddingRight: "24px",
      paddingLeft: "12px",
      paddingBottom: "2px"
    }
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

  changeFiltering(property, option) {
    const newArray = this.state.selectedFilters[property] || [];
    const currentIndex = newArray.indexOf(option);
    currentIndex === -1
      ? newArray.push(option)
      : newArray.splice(currentIndex, 1);
    this.setState({
      selectedFilters: { ...this.state.selectedFilters, [property]: newArray }
    });
  }

  sortAndFilter(tableData) {
    return Object.entries(tableData)
      .filter(([rowId, rowData]) => {
        return Object.entries(this.state.selectedFilters)
          .map(([property, allowed]) => {
            return allowed.includes(rowData[property]) || !allowed.length;
          })
          .reduce((acc, result) => acc && result, true);
      })
      .sort((key1, key2) => {
        const prop = this.state.sort.by;
        let result = (key1[1][prop] || "") > (key2[1][prop] || "");
        if (this.state.sort.reverse) result = !result;
        return result ? 1 : -1;
      });
  }

  render() {
    return (
      <div style={{ paddingTop: "64px", display: "flex" }}>
        <FilterBar
          filters={this.props.filters}
          selected={this.state.selectedFilters}
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
