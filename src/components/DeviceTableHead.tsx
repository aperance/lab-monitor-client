import React from "react";
import { TableHead, TableRow, TableCell, makeStyles } from "@material-ui/core";
import TableSortLabel from "@material-ui/core/TableSortLabel";

import config from "../configuration";

type Props = {
  selectedSorting: {
    property: string | null;
    reverse: boolean;
  };
  setSorting: (x: { property: string }) => void;
};

/** CSS-in-JS styling */
const useStyles = makeStyles({
  cell: { fontSize: "0.825rem", backgroundColor: "#ffffff" }
});

/**
 * Header component for device table. User may click on column headers to
 * control table sorting (sorting state contolled by parent).
 */
const DeviceTableHead = (props: Props): JSX.Element => {
  /** Generated CSS class names */
  const classes = useStyles();

  return (
    <TableHead>
      <TableRow>
        <TableCell key="status" className={classes.cell} />
        {config.columns.map((column) => (
          <TableCell key={column.title} className={classes.cell}>
            <TableSortLabel
              active={props.selectedSorting.property === column.property}
              direction={props.selectedSorting.reverse ? "asc" : "desc"}
              onClick={() => props.setSorting({ property: column.property })}
            >
              {column.title}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default React.memo(
  DeviceTableHead,
  (prev, next) =>
    prev.selectedSorting.property === next.selectedSorting.property &&
    prev.selectedSorting.reverse === next.selectedSorting.reverse
);
