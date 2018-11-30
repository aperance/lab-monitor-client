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
  sortState: { property: string | null; direction: "asc" | "desc" };
  changeSort: (property: string) => void;
}

const AssetTableHead = (props: Props) => {
  return (
    <TableHead>
      <TableRow className={props.classes.row}>
        <TableCell key="status" className={props.classes.cell} />
        {props.columns &&
          props.columns.map(column => (
            <TableCell key={column.title} className={props.classes.cell}>
              <TableSortLabel
                active={props.sortState.property === column.property}
                direction={props.sortState.direction}
                onClick={() => props.changeSort(column.property)}
              >
                {column.title}
              </TableSortLabel>
            </TableCell>
          ))}
      </TableRow>
    </TableHead>
  );
};

const memoizedAssetTableHead = React.memo(
  AssetTableHead,
  (prevProps, nextProps) =>
    prevProps.sortState.property === nextProps.sortState.property &&
    prevProps.sortState.direction === nextProps.sortState.direction
);

export default withStyles(styles)(memoizedAssetTableHead);
