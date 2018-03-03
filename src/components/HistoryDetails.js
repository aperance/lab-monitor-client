import React, { Component } from "react";
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "material-ui/Table";

class HistoryDetails extends Component {
  render() {
    return (
      <Table>
        <TableHead>
          <TableRow style={{ height: "48px" }}>
            <TableCell style={{ paddingRight: "12px" }}>Timestamp</TableCell>
            <TableCell style={{ paddingRight: "12px" }}>Value</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {this.props.values.map(value => (
            <TableRow
              key={value[0]}
              style={{ height: "36px", fontSize: "0.75rem" }}
            >
              <TableCell>{value[0]}</TableCell>
              <TableCell>{value[1]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}

export default HistoryDetails;
