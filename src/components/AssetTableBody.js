import React, { Component } from "react";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import StatusIndicator from "./StatusIndicator.js";

class AssetTableBody extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      tableData: Object.entries(nextProps.tableData)
        .filter(([rowId, rowData]) => {
          return Object.entries(nextProps.filters || {})
            .map(([property, allowed]) => {
              return allowed.includes(rowData[property]) || !allowed.length;
            })
            .reduce((acc, result) => acc && result, true);
        })
        .sort((key1, key2) => {
          const prop = nextProps.sort.by;
          let result = (key1[1][prop] || "") > (key2[1][prop] || "");
          if (nextProps.sort.reverse) result = !result;
          return result ? 1 : -1;
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
            <TableCell
              key={rowId + "status"}
              // style={
              //   rowData.active
              //     ? { color: "mediumseagreen" }
              //     : { color: "crimson" }
              // }
            >
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
