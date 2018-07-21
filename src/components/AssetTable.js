import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import AssetTableHead from "./AssetTableHead";
import AssetTableRow from "./AssetTableRow";

const styles = theme => ({
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    whiteSpace: "nowrap",
    margin: "0px 16px"
  },
  belowTable: {
    flex: 1
  }
});

class AssetTable extends Component {
  render() {
    return (
      <div className={this.props.classes.root}>
        <Table>
          <AssetTableHead
            columns={this.props.columns}
            sort={this.props.sort}
            changeSorting={this.props.changeSorting}
          />
          <TableBody>
            {this.props.tableData.map(([rowId, rowData]) => (
              <AssetTableRow
                key={rowId}
                columns={this.props.columns}
                rowData={rowData}
                selected={this.props.selected.includes(rowId)}
                handleRowClick={e => this.props.handleRowClick(e, rowId)}
              />
            ))}
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
