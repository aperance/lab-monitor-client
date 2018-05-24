import React, { Component } from "react";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

class AssetTableBody extends Component {
  constructor(props) {
    super(props);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      tableData: Object.entries(nextProps.tableData)
        .filter(([rowId, rowData]) => {
          return Object.entries(nextProps.filters || {}).reduce(
            (acc, [property, allowed]) => {
              return (
                acc &&
                (allowed.length === 0 || allowed.includes(rowData[property]))
              );
            },
            true
          );
        })
        .sort((key1, key2) => {
          const value1 = key1[1][nextProps.sort.by] || "";
          const value2 = key2[1][nextProps.sort.by] || "";
          return nextProps.sort.reverse
            ? value1 < value2
            : value1 > value2
              ? 1
              : -1;
        })
    };
  }

  render() {
    return (
      <TableBody>
        {this.state.tableData.map(([rowId, rowData]) => (
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
                  style={rowData.active ? { color: "black" } : { color: "red" }}
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

export default AssetTableBody;
