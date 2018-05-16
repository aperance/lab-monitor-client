import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "material-ui/Table";

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
  constructor(props) {
    super(props);
    this.state = {
      sortBy: null,
      reverse: false
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.sortBy || !nextProps.columns[0]) return null;
    else return { sortBy: nextProps.columns[0].property };
  }

  changeSorting(property) {
    if (this.state.sortBy === property)
      this.setState({ reverse: !this.state.reverse });
    else this.setState({ sortBy: property });
  }

  sortingAlgorithim(a, b) {
    if (a[1][this.state.sortBy] < b[1][this.state.sortBy])
      return this.state.reverse ? 1 : -1;
    else if (a[1][this.state.sortBy] > b[1][this.state.sortBy])
      return this.state.reverse ? -1 : 1;
    else return 0;
  }

  render() {
    return (
      <Table className={this.props.classes.table}>
        <TableHead>
          <TableRow>
            {this.props.columns &&
              this.props.columns.map(column => (
                <TableCell
                  key={column.title}
                  onClick={() => this.changeSorting(column.property)}
                >
                  {column.title}
                </TableCell>
              ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {this.props.tableData
            .sort(this.sortingAlgorithim.bind(this))
            .map(([rowId, rowData]) => (
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
                      style={
                        rowData.active ? { color: "black" } : { color: "red" }
                      }
                    >
                      {rowData[column.property]}
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
