import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import AssetTableHead from "./AssetTableHead";
import AssetTableRow from "./AssetTableRow";

const styles = theme => ({
  root: {
    height: "100%",
    overflowX: "hidden",
    display: "flex",
    flexDirection: "column"
  },
  table: {
    whiteSpace: "nowrap",
    margin: "0px 16px",
    flex: 0
  },
  belowTable: {
    margin: "0px 16px",
    flex: 1
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
      <div className={this.props.classes.root}>
        <Table className={this.props.classes.table}>
          <AssetTableHead
            columns={this.props.columns}
            sort={this.state.sort}
            changeSorting={this.changeSorting.bind(this)}
          />
          <TableBody>
            {this.sortAndFilter(this.props.tableData).map(
              ([rowId, rowData]) => (
                <AssetTableRow
                  key={rowId}
                  columns={this.props.columns}
                  rowData={rowData}
                  selected={this.props.selected.includes(rowId)}
                  handleRowClick={e => this.props.handleRowClick(e, rowId)}
                />
              )
            )}
          </TableBody>
        </Table>

        <div
          className={this.props.classes.belowTable}
          onClick={e => this.props.handleRowClick(e.nativeEvent, null)}
        />
      </div>
    );
  }
}

export default withStyles(styles)(AssetTable);
