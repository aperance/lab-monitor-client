import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "material-ui/Table";

const styles = theme => ({
  table: {
    whiteSpace: "nowrap",
    margin: "0px 8px",
    "& thead > tr": { height: "48px" },
    "& th": { paddingRight: "12px" },
    "& tbody > tr": { height: "36px" },
    "& td": { fontSize: "0.75rem", paddingRight: "12px" }
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
  render() {
    return (
      <Table className={this.props.classes.table}>
        <TableHead>
          <TableRow>
            {this.props.columns &&
              this.props.columns.map(column => (
                <TableCell key={column.title}>{column.title}</TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.tableData.map(([rowId, rowData]) => (
            <TableRow
              key={rowId}
              hover
              selected={this.props.selected.includes(rowId)}
              onClick={e => this.props.handleRowClick(e.nativeEvent, rowId)}
            >
              {this.props.columns &&
                this.props.columns.map(column => (
                  <TableCell
                    key={rowId + column.property}
                    style={
                      rowData.active ? { color: "black" } : { color: "red" }
                    }
                  >
                    {rowData[column.property]}
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
