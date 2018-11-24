import * as React from "react";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
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
  sortProperty: string | null;
  sortDirection: "asc" | "desc";
  changeSorting: (property: string) => void;
}

<<<<<<< HEAD
const AssetTableHead = (props: Props) => {
  const classes = useStyles();

=======
function preventRender(prevProps: Props, nextProps: Props) {
  return (
    prevProps.sortProperty === nextProps.sortProperty &&
    prevProps.sortDirection === nextProps.sortDirection
  );
}

function AssetTableHead(props: Props) {
>>>>>>> parent of d52762c... Migrated to material-ui/styles with hooks
  return (
    <TableHead>
      <TableRow className={props.classes.row}>
        <TableCell key="status" className={props.classes.cell} />
        {props.columns &&
          props.columns.map(column => (
            <TableCell key={column.title} className={props.classes.cell}>
              <TableSortLabel
                active={props.sortProperty === column.property}
                direction={props.sortDirection}
                onClick={() => props.changeSorting(column.property)}
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
  (prevProps: Props, nextProps: Props) => {
    return (
      prevProps.sortProperty === nextProps.sortProperty &&
      prevProps.sortDirection === nextProps.sortDirection
    );
  }
);

<<<<<<< HEAD
export { memoizedAssetTableHead as AssetTableHead };
=======
export default withStyles(styles)(React.memo(AssetTableHead, preventRender));
>>>>>>> parent of d52762c... Migrated to material-ui/styles with hooks
