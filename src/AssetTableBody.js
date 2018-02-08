import React, { Component } from "react";
import { Table, TableBody, TableRow, TableRowColumn } from "material-ui/Table";

class AssetTableBody extends Component {
  render() {
    return (
      <Table
        wrapperStyle={{ marginTop: "58px" }}
        multiSelectable={true}
        onRowSelection={rowsByIndex =>
          this.props.handleRowSelect(
            rowsByIndex.map(index => this.props.rowOrder[index])
          )
        }
      >
        <TableBody deselectOnClickaway={false} displayRowCheckbox={false}>
          {this.props.rowOrder.map(row => (
            <TableRow key={row} selected={this.props.selected.includes(row)}>
              <TableRowColumn key={row + "ID"}>{row}</TableRowColumn>
              {this.props.rows[row].map(rowColumn => (
                <TableRowColumn key={row + rowColumn}>
                  {rowColumn}
                </TableRowColumn>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}

export default AssetTableBody;
