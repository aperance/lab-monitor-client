import React, { Component } from "react";
import { connect } from "react-redux";
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "material-ui/Table";

class AssetTable extends Component {
  render() {
    return (
      <div style={{ whiteSpace: "nowrap" }}>
        <Table>
          <TableHead>
            <TableRow style={{ height: "48px" }}>
              {this.props.columns.map(column => (
                <TableCell key={column.title} style={{ paddingRight: "12px" }}>
                  {column.title}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {Object.keys(this.props.tableData).map(rowKey => (
              <TableRow
                onClick={e => this.props.handleRowClick(e.nativeEvent, rowKey)}
                key={rowKey}
                selected={this.props.selected.includes(rowKey)}
                style={{ height: "36px" }}
              >
                {this.props.columns.map(column => (
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
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    columns: state.configuration.columns,
    tableData: state.table,
    selected: state.selected
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleRowClick: (e, rowKey) => {
      dispatch({
        type: "UPDATE_SELECTED",
        id: rowKey,
        multi: e.altKey || e.ctrlKey
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AssetTable);
