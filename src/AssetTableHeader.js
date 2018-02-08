import React, { Component } from "react";
import {
  Table,
  TableHeader,
  TableHeaderColumn,
  TableRow
} from "material-ui/Table";

class AssetTableHeader extends Component {
  render() {
    return (
      <Table style={{ position: "fixed" }}>
        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
          <TableRow>
            {this.props.header.map(headerColumn => (
              <TableHeaderColumn key={headerColumn}>
                {headerColumn}
              </TableHeaderColumn>
            ))}
          </TableRow>
        </TableHeader>
      </Table>
    );
  }
}

export default AssetTableHeader;
