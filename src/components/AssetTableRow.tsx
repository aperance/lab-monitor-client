import * as React from "react";
// @ts-ignore
import { makeStyles } from "@material-ui/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
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

function preventRender(prevProps: Props, nextProps: Props) {
  return (
    prevProps.rowData.timestamp === nextProps.rowData.timestamp &&
    prevProps.selected === nextProps.selected
  );
}

function AssetTableRow(props: Props) {
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
}

export default React.memo(AssetTableRow, preventRender);
