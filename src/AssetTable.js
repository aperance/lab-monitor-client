import React, { Component } from "react";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";

class AssetTable extends Component {
  state = {
    tableData: {
      header: ["A", "B", "C", "D", "E"],
      rows: [
        { id: "9001", data: ["1A", "1B", "1C", "1D", "1E"] },
        { id: "9002", data: ["2A", "2B", "2C", "2D", "2E"] },
        { id: "9003", data: ["3A", "3B", "3C", "3D", "3E"] },
        { id: "9004", data: ["4A", "4B", "4C", "4D", "4E"] },
        { id: "9005", data: ["5A", "5B", "5C", "5D", "5E"] },
        { id: "9006", data: ["6A", "6B", "6C", "6D", "6E"] }
      ]
    },
    selectedAssets: ["9001", "9003"]
  };

  handleRowSelect = selectedRows => {
    const selectedAssets = selectedRows.map(
      x => this.state.tableData.rows[x].id
    );
    console.log(selectedAssets);
    this.setState({ selectedAssets });
  };

  render() {
    return (
      <Table multiSelectable={true} onRowSelection={this.handleRowSelect}>
        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
          <TableRow>
            {this.state.tableData.header.map(headerColumn => (
              <TableHeaderColumn key={headerColumn}>
                {headerColumn}
              </TableHeaderColumn>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody deselectOnClickaway={false} displayRowCheckbox={false}>
          {this.state.tableData.rows.map(row => (
            <TableRow
              key={row.id}
              selected={this.state.selectedAssets.includes(row.id)}
            >
              {row.data.map(rowColumn => (
                <TableRowColumn>{rowColumn}</TableRowColumn>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}

export default AssetTable;
