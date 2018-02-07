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
            rowsByIndex.map(index => this.props.rows[index].id)
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
          {this.props.rows.map(row => (
            <TableRow
              key={row.id}
              selected={this.props.selected.includes(row.id)}
            >
              {row.data.map(rowColumn => (
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
