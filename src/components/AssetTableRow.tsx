import * as React from "react";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import { TableRow, TableCell } from "@material-ui/core";
import StatusIndicator from "./StatusIndicator";

const styles = createStyles({
  row: { height: "36px", cursor: "pointer", userSelect: "none" },
  cell: {
    fontSize: "0.75rem",
    paddingRight: "24px",
    paddingLeft: "12px",
    paddingBottom: "2px"
  }
});

interface Props extends WithStyles<typeof styles> {
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

const AssetTableRow = (props: Props) => {
  return (
    <TableRow
      hover
      className={props.classes.row}
      selected={props.selected}
      onClick={e => props.handleRowClick(e.nativeEvent)}
    >
      <TableCell className={props.classes.cell}>
        <StatusIndicator
          timestamp={props.rowData.timestamp}
          status={props.rowData.status}
        />
      </TableCell>
      {props.columns &&
        props.columns.map(column => (
          <TableCell key={column.property} className={props.classes.cell}>
            {props.rowData[column.property]}
          </TableCell>
        ))}
    </TableRow>
  );
};

const memoizedAssetTableRow = React.memo(
  AssetTableRow,
  (prevProps, nextProps) =>
    prevProps.rowData.timestamp === nextProps.rowData.timestamp &&
    prevProps.selected === nextProps.selected
);

export default withStyles(styles)(memoizedAssetTableRow);
