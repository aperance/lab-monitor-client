import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

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

class AssetTableRow extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.props.rowData.timestamp !== nextProps.rowData.timestamp ||
      this.props.selected !== nextProps.selected
    )
      return true;
    else return false;
  }

  render() {
    return (
      <TableRow
        hover
        className={this.props.classes.row}
        selected={this.props.selected}
        onClick={e => this.props.handleRowClick(e.nativeEvent)}
      >
        <TableCell className={this.props.classes.cell}>
          <StatusIndicator
            timestamp={this.props.rowData.timestamp}
            status={this.props.rowData.status}
          />
        </TableCell>
        {this.props.columns &&
          this.props.columns.map(column => (
            <TableCell
              key={column.property}
              className={this.props.classes.cell}
            >
              {this.props.rowData[column.property]}
            </TableCell>
          ))}
      </TableRow>
    );
  }
}

export default withStyles(styles)(AssetTableRow);
