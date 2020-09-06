import React, { useState, useRef, useEffect } from "react";
import { TableRow, TableCell, makeStyles } from "@material-ui/core";
import StatusIndicator from "@material-ui/icons/Lens";

import config from "../configuration";

type Props = {
  rowData: {
    [property: string]: string | null;
  };
  selected: boolean;
  handleRowClick: (e: MouseEvent) => void;
};

type StyleProps = {
  status: string | null;
  animate: boolean | null;
};

/** CSS-in-JS styling */
const useStyles = makeStyles({
  row: { cursor: "pointer", userSelect: "none" },
  selectedRow: { backgroundColor: "rgba(0, 0, 0, 0.04) !important" },
  cell: {
    fontSize: "0.75rem",
    lineHeight: "unset"
  },
  status: {
    fontSize: "15px",
    transition: "opacity 0.5s",
    paddingTop: "2px",
    opacity: (props: StyleProps) => (props.animate ? 0.3 : 1),
    color: (props: StyleProps) => {
      switch (props.status) {
        case "CONNECTED":
          return "mediumseagreen";
        case "RETRY":
          return "mediumseagreen";
        case "DISCONNECTED":
          return "rgb(239, 239, 35)";
        default:
          return "crimson";
      }
    }
  }
});

/**
 * Table row component for device table.
 * Includes status icon that flashes on update.
 */
const DeviceTableRow = (props: Props): JSX.Element => {
  const isInitialMount = useRef(true);
  /** Status icon animation state */
  const [animate, setAnimate] = useState<boolean | null>(null);
  /** Generated CSS class names */
  const classes = useStyles({ status: props.rowData.status, animate });

  useEffect(() => {
    /** Skip status icon animation on initial load. */
    if (isInitialMount.current) isInitialMount.current = false;
    else {
      setAnimate(true);
      const id = setTimeout(() => setAnimate(false), 500);
      return () => clearTimeout(id);
    }
  }, [props.rowData.timestamp, props.rowData.status]);

  return (
    <TableRow
      hover
      classes={{ root: classes.row, selected: classes.selectedRow }}
      selected={props.selected}
      onClick={(e) => props.handleRowClick(e.nativeEvent)}
    >
      <TableCell className={classes.cell}>
        <StatusIndicator className={classes.status} />
      </TableCell>
      {config.columns.map((column) => (
        <TableCell key={column.property} className={classes.cell}>
          {props.rowData[column.property]}
        </TableCell>
      ))}
    </TableRow>
  );
};

export default React.memo(
  DeviceTableRow,
  (prev, next) =>
    prev.rowData.timestamp === next.rowData.timestamp &&
    prev.rowData.status === next.rowData.status &&
    prev.selected === next.selected
);
