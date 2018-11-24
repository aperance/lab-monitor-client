import * as React from "react";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { StatusIndicator } from "./StatusIndicator";

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

<<<<<<< HEAD
const AssetTableRow = (props: Props) => {
  const classes = useStyles();

=======
function preventRender(prevProps: Props, nextProps: Props) {
  return (
    prevProps.rowData.timestamp === nextProps.rowData.timestamp &&
    prevProps.selected === nextProps.selected
  );
}

function AssetTableRow(props: Props) {
>>>>>>> parent of d52762c... Migrated to material-ui/styles with hooks
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
  (prevProps: Props, nextProps: Props) => {
    return (
      prevProps.rowData.timestamp === nextProps.rowData.timestamp &&
      prevProps.selected === nextProps.selected
    );
  }
);

<<<<<<< HEAD
export { memoizedAssetTableRow as AssetTableRow };
=======
export default withStyles(styles)(React.memo(AssetTableRow, preventRender));
>>>>>>> parent of d52762c... Migrated to material-ui/styles with hooks
