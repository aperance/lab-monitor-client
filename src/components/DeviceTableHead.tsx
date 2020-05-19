import * as React from "react";
import {TableHead, TableRow, TableCell, makeStyles} from "@material-ui/core";
import TableSortLabel from "@material-ui/core/TableSortLabel";

const useStyles = makeStyles({
  cell: {fontSize: "0.825rem", backgroundColor: "#ffffff"}
});

interface Props {
  columns: Array<{
    title: string;
    property: string;
  }>;
  selectedSorting: {property: string | null; reverse: boolean};
  changeSort: (property: string) => void;
}

const DeviceTableHead = (props: Props) => {
  const classes = useStyles();

  return (
    <TableHead>
      <TableRow>
        <TableCell key="status" className={classes.cell} />
        {props.columns &&
          props.columns.map(column => (
            <TableCell key={column.title} className={classes.cell}>
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

export default memoizedDeviceTableHead;
