import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import StatusIndicator from "./StatusIndicator.js";

const styles = theme => ({
  row: { height: "36px", cursor: "pointer", userSelect: "none" },
  cell: {
    fontSize: "0.75rem",
    paddingRight: "24px",
    paddingLeft: "12px",
    paddingBottom: "2px"
  }
});
class AssetTableBody extends Component {
  render() {
    return (
      <TableBody>
        {this.props.tableData.map(([rowId, rowData]) => (
          <TableRow
            key={rowId}
            hover
            className={this.props.classes.row}
            selected={this.props.selected.includes(rowId)}
            onClick={e => this.props.handleRowClick(e.nativeEvent, rowId)}
          >
            <TableCell
              key={rowId + "status"}
              className={this.props.classes.cell}
            >
              <StatusIndicator
                timestamp={rowData.timestamp}
                status={rowData.status}
              />
            </TableCell>
            {this.props.columns &&
              this.props.columns.map(column => (
                <TableCell
                  key={rowId + column.property}
                  className={this.props.classes.cell}
                >
                  {rowData[column.property]}
                </TableCell>
              ))}
          </TableRow>
        ))}
      </TableBody>
    );
  }
}

export default withStyles(styles)(AssetTableBody);
