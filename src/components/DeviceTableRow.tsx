import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import { TableRow, TableCell } from "@material-ui/core";
import StatusIndicator from "./StatusIndicator";

const useStyles = makeStyles({
  row: { height: "36px", cursor: "pointer", userSelect: "none" },
  cell: {
    fontSize: "0.75rem",
    paddingRight: "24px",
    paddingLeft: "12px",
    paddingBottom: "2px"
  }
});

interface Props {
  rowData: {
    [property: string]: string | null;
  };
  columns: Array<{
    title: string;
    property: string;
  }>;
  selected: boolean;
  handleRowClick: (e: MouseEvent) => void;
}

const DeviceTableRow = (props: Props) => {
  const classes = useStyles();

  return (
    <TableRow
      hover
      className={classes.row}
      selected={props.selected}
      onClick={e => props.handleRowClick(e.nativeEvent)}
    >
      <TableCell className={classes.cell}>
        <StatusIndicator
          timestamp={props.rowData.timestamp}
          status={props.rowData.status}
        />
      </TableCell>
      {props.columns &&
        props.columns.map(column => (
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
