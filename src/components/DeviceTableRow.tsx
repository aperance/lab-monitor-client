/**
 *
 * @packageDocumentation
 */

import React from "react";
import {TableRow, TableCell, makeStyles} from "@material-ui/core";

import config from "../configuration/configuration";
import StatusIndicator from "./StatusIndicator";

type Props = {
  rowData: {
    [property: string]: string | null;
  };
  selected: boolean;
  handleRowClick: (e: MouseEvent) => void;
};

/** CSS-in-JS styling */
const useStyles = makeStyles({
  row: {cursor: "pointer", userSelect: "none"},
  selectedRow: {backgroundColor: "rgba(0, 0, 0, 0.04) !important"},
  cell: {
    fontSize: "0.75rem",
    lineHeight: "unset"
  }
});

const DeviceTableRow = (props: Props): JSX.Element => {
  /** Generated CSS class names */
  const classes = useStyles();

  return (
    <TableRow
      hover
      classes={{root: classes.row, selected: classes.selectedRow}}
      selected={props.selected}
      onClick={e => props.handleRowClick(e.nativeEvent)}
    >
      <TableCell className={classes.cell}>
        <StatusIndicator
          timestamp={props.rowData.timestamp}
          status={props.rowData.status}
        />
      </TableCell>
      {config.columns.map(column => (
        <TableCell key={column.property} className={classes.cell}>
          {props.rowData[column.property]}
        </TableCell>
      ))}
    </TableRow>
  );
};

const memoizedDeviceTableRow = React.memo(
  DeviceTableRow,
  (prevProps, nextProps) =>
    prevProps.rowData.timestamp === nextProps.rowData.timestamp &&
    prevProps.rowData.status === nextProps.rowData.status &&
    prevProps.selected === nextProps.selected
);

export default memoizedDeviceTableRow;
