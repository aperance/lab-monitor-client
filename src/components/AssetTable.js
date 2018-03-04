import React, { Component } from "react";
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "material-ui/Table";

class AssetTable extends Component {
  render() {
    return (
      <Table style={{ whiteSpace: "nowrap" }}>
        <TableHead>
          <TableRow style={{ height: "48px" }}>
            {this.props.columns &&
              this.props.columns.map(column => (
                <TableCell key={column.title} style={{ paddingRight: "12px" }}>
                  {column.title}
                </TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(this.props.tableData).map(rowKey => (
            <TableRow
              hover
              onClick={e => this.props.handleRowClick(e.nativeEvent, rowKey)}
              key={rowKey}
              selected={this.props.selected.includes(rowKey)}
              style={{ height: "36px" }}
            >
              {this.props.columns &&
                this.props.columns.map(column => (
                  <TableCell
                    key={rowKey + column.property}
                    style={{ fontSize: "0.75rem", paddingRight: "12px" }}
                  >
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

export default AssetTable;
