import React, { Component } from "react";
import { connect } from "react-redux";
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "material-ui/Table";

class DetailsList extends Component {
  render() {
    return (
      <div>
        {/* <iframe
          src=
          width="100%"
          height="500"
          frameBorder="0"
          title="d"
          sandbox
        /> */}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell key="property" padding="dense">
                Property
              </TableCell>
              <TableCell key="value" padding="dense">
                Value
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {Object.entries(this.props.data).map(([key, value]) => (
              <TableRow key={key + ":r"}>
                <TableCell key={key + ":k"} padding="dense">
                  {key}
                </TableCell>
                <TableCell key={key + ":v"} padding="dense">
                  {value}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  switch (state.selected.length) {
    case 1:
      return { data: state.table[state.selected[0]] };
    default:
      return { data: {} };
  }
};

export default connect(mapStateToProps)(DetailsList);
