import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";

const styles = theme => ({
  row: { height: "48px" },
  cell: { paddingRight: "4px", paddingLeft: "12px" }
});

class AssetTableHead extends Component {
  render() {
    return (
      <TableHead>
        <TableRow className={this.props.classes.row}>
          <TableCell key="status" className={this.props.classes.cell} />
          {this.props.columns &&
            this.props.columns.map(column => (
              <TableCell key={column.title} className={this.props.classes.cell}>
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

export default withStyles(styles)(AssetTableHead);
