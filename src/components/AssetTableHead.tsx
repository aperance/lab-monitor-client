import * as React from "react";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";

const styles = createStyles({
  row: { height: "48px" },
  cell: { paddingRight: "4px", paddingLeft: "12px" }
});

interface Props extends WithStyles<typeof styles> {
  columns: Array<{
    title: string;
    property: string;
  }>;
  sortProperty: string | null;
  sortDirection: "asc" | "desc";
  changeSorting: (property: string) => void;
}

class AssetTableHead extends React.Component<Props> {
  public shouldComponentUpdate(nextProps: Props) {
    if (
      this.props.sortProperty !== nextProps.sortProperty ||
      this.props.sortDirection !== nextProps.sortDirection
    )
      return true;
    else return false;
  }

  public render() {
    return (
      <TableHead>
        <TableRow className={this.props.classes.row}>
          <TableCell key="status" className={this.props.classes.cell} />
          {this.props.columns &&
            this.props.columns.map(column => (
              <TableCell key={column.title} className={this.props.classes.cell}>
                <TableSortLabel
                  active={this.props.sortProperty === column.property}
                  direction={this.props.sortDirection}
                  onClick={() => this.props.changeSorting(column.property)}
                >
                  {column.title}
                </TableSortLabel>
              </TableCell>
            ))}
        </TableRow>
      </TableHead>
    );
  }
}

export default withStyles(styles)(AssetTableHead);
