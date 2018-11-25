import * as React from "react";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import { TableHead, TableRow, TableCell } from "@material-ui/core";
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

function AssetTableHead(props: Props) {
  return (
    <TableHead>
      <TableRow className={props.classes.row}>
        <TableCell key="status" className={props.classes.cell} />
        {props.columns &&
          props.columns.map(column => (
            <TableCell key={column.title} className={props.classes.cell}>
              <TableSortLabel
                active={props.sortProperty === column.property}
                direction={props.sortDirection}
                onClick={() => props.changeSorting(column.property)}
              >
                {column.title}
              </TableSortLabel>
            </TableCell>
          ))}
      </TableRow>
    </TableHead>
  );
}

const memoizedAssetTableHead = React.memo(
  AssetTableHead,
  (prevProps, nextProps) =>
    prevProps.sortProperty === nextProps.sortProperty &&
    prevProps.sortDirection === nextProps.sortDirection
);

export default withStyles(styles)(memoizedAssetTableHead);
