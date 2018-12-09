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
  selectedSorting: { property: string | null; reverse: boolean };
  changeSort: (property: string) => void;
}

const DeviceTableHead = (props: Props) => {
  return (
    <TableHead>
      <TableRow className={props.classes.row}>
        <TableCell key="status" className={props.classes.cell} />
        {props.columns &&
          props.columns.map(column => (
            <TableCell key={column.title} className={props.classes.cell}>
              <TableSortLabel
                active={props.selectedSorting.property === column.property}
                direction={props.selectedSorting.reverse ? "asc" : "desc"}
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

const memoizedDeviceTableHead = React.memo(
  DeviceTableHead,
  (prevProps, nextProps) =>
    prevProps.selectedSorting.property === nextProps.selectedSorting.property &&
    prevProps.selectedSorting.reverse === nextProps.selectedSorting.reverse
);

export default withStyles(styles)(memoizedDeviceTableHead);
