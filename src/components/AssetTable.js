import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "material-ui/Table";
//import Icon from "material-ui/Icon";

const styles = theme => ({
  table: {
    whiteSpace: "nowrap",
    margin: "0px 8px",
    "& thead > tr": { height: "48px" },
    "& th": { paddingRight: "12px" },
    "& tbody > tr": { height: "36px" },
    "& td": { fontSize: "0.75rem", paddingRight: "12px" }
  },
  button: {
    padding: "0px 4px 4px 4px",
    minWidth: "12px",
    minHeight: "12px"
  },
  icon: {
    height: "auto",
    width: "auto",
    fontSize: "0.75rem"
  }
});

class AssetTable extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     filters: this.props.columns.reduce((acc, { property }) => {
  //       acc[property] = { anchorEl: null, filterSlected: null };
  //       return acc;
  //     }, {})
  //   };
  // }

  render() {
    return (
      <Table className={this.props.classes.table}>
        <TableHead>
          <TableRow>
            {this.props.columns &&
              this.props.columns.map(column => (
                <TableCell key={column.title}>
                  {column.title}
                  {/* <Icon className={this.props.classes.icon}>filter_list</Icon> */}
                </TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(this.props.tableData).map(rowKey => (
            <TableRow
              key={rowKey}
              hover
              selected={this.props.selected.includes(rowKey)}
              onClick={e => this.props.handleRowClick(e.nativeEvent, rowKey)}
            >
              {this.props.columns &&
                this.props.columns.map(column => (
                  <TableCell key={rowKey + column.property}>
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

export default withStyles(styles)(AssetTable);
