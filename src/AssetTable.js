import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";

class AssetTable extends Component {
  render() {
    return (
      <Table
        multiSelectable={true}
        onRowSelection={rowsByIndex =>
          this.props.handleRowSelect(
            rowsByIndex.map(index => this.props.rowOrder[index])
          )
        }
      >
        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
          <TableRow>
            {this.props.header.map(headerColumn => (
              <TableHeaderColumn key={headerColumn}>
                {headerColumn}
              </TableHeaderColumn>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody deselectOnClickaway={false} displayRowCheckbox={false}>
          {this.props.rowOrder.map(row => (
            <TableRow key={row} selected={this.props.selected.includes(row)}>
              {this.props.rows[row].map(rowColumn => (
                <TableRowColumn>{rowColumn}</TableRowColumn>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}

const mapStateToProps = state => {
  return {
    header: state.table.header,
    rows: state.table.rows,
    rowOrder: Object.keys(state.table.rows),
    selected: state.selected
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleRowSelect: selected => {
      dispatch({
        type: "SET_SELECTED",
        selected
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AssetTable);
