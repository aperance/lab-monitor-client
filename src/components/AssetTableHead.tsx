import * as React from "react";
// @ts-ignore
import { makeStyles } from "@material-ui/styles";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";

const useStyles = makeStyles({
  row: { height: "48px" },
  cell: { paddingRight: "4px", paddingLeft: "12px" }
});

interface Props {
  columns: Array<{
    title: string;
    property: string;
  }>;
  sortProperty: string | null;
  sortDirection: "asc" | "desc";
  changeSorting: (property: string) => void;
}

const AssetTableHead = (props: Props) => {
  const classes = useStyles();

  return (
    <TableHead>
      <TableRow className={classes.row}>
        <TableCell key="status" className={classes.cell} />
        {props.columns &&
          props.columns.map(column => (
            <TableCell key={column.title} className={classes.cell}>
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

export { memoizedAssetTableHead as AssetTableHead };
