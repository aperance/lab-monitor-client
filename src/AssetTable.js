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
      <div>
        <Table>
          <TableHead>
            <TableRow>
              {this.props.columns.map(column => (
                <TableCell key={column.title}>{column.title}</TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {Object.keys(this.props.tableData).map(rowKey => (
              <TableRow
                onClick={e => this.props.handleRowClick(rowKey)}
                key={rowKey}
                selected={this.props.selected.includes(rowKey)}
              >
                {this.props.columns.map(column => (
                  <TableCell key={rowKey + column.property}>
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
    handleRowClick: rowKey => {
      dispatch({
        type: "UPDATE_SELECTED",
        id: rowKey
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AssetTable);
