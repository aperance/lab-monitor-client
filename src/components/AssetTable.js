import React, { Component } from "react";
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "material-ui/Table";
import { withStyles } from "material-ui/styles";

const styles = theme => ({
  root: {
    whiteSpace: "nowrap",
    "& thead > tr": { height: "48px" },
    "& th": { paddingRight: "12px" },
    "& tbody > tr": { height: "36px" },
    "& td": { fontSize: "0.75rem", paddingRight: "12px" }
  }
});

class AssetTable extends Component {
  render() {
    return (
      <Table className={this.props.classes.root}>
        <TableHead>
          <TableRow>
            {this.props.columns &&
              this.props.columns.map(column => (
                <TableCell key={column.title}>{column.title}</TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(this.props.tableData).map(rowKey => (
            <TableRow
              key={rowKey}
              hover
              selected={this.props.selected.includes(rowKey)}
              onClick={e => this.props.handleRowClick(e.nativeEvent, rowKey)}
            >
              {this.props.columns &&
                this.props.columns.map(column => (
                  <TableCell key={rowKey + column.property}>
                    {this.props.tableData[rowKey][column.property]}
                  </TableCell>
                ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}

export default withStyles(styles)(AssetTable);
