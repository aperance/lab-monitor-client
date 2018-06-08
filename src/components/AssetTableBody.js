import React, { Component } from "react";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import StatusIndicator from "./StatusIndicator.js";

class AssetTableBody extends Component {
  render() {
    return (
      <TableBody>
        {this.props.tableData.map(([rowId, rowData]) => (
          <TableRow
            key={rowId}
            hover
            selected={this.props.selected.includes(rowId)}
            onClick={e => this.props.handleRowClick(e.nativeEvent, rowId)}
          >
            <TableCell key={rowId + "status"}>
              <StatusIndicator
                timestamp={rowData.timestamp}
                active={rowData.timestamp}
              />
            </TableCell>
            {this.props.columns &&
              this.props.columns.map(column => (
                <TableCell key={rowId + column.property}>
                  {rowData[column.property]}
                </TableCell>
              ))}
          </TableRow>
        ))}
      </TableBody>
    );
  }
}

export default AssetTableBody;
