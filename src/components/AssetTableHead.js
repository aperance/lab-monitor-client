import React, { Component } from "react";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";

class AssetTableHead extends Component {
  render() {
    return (
      <TableHead>
        <TableRow>
          {this.props.columns &&
            this.props.columns.map(column => (
              <TableCell key={column.title}>
                <TableSortLabel
                  active={this.props.sort.by === column.property}
                  direction={this.props.sort.reverse ? "asc" : "desc"}
                  onClick={() => this.props.changeSorting(column.property)}
                >
                  {column.title}
                </TableSortLabel>
              </TableCell>
            ))}
        </TableRow>
      </TableHead>
    );
  }
}

export default AssetTableHead;
