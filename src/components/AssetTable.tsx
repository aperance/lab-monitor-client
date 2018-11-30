import * as React from "react";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import { Table, TableBody } from "@material-ui/core";
import AssetTableHead from "./AssetTableHead";
import AssetTableRow from "./AssetTableRow";
import { useTableSorting } from "../hooks/useTableSorting";

const styles = createStyles({
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    whiteSpace: "nowrap",
    margin: "0px 16px",
    overflowX: "hidden",
    flex: 1,
    userSelect: "none"
  },
  belowTable: {
    flex: 1
  }
});

interface Props extends WithStyles<typeof styles> {
  tableData: Array<[string, { [x: string]: string | null }]>;
  columns: Array<{ title: string; property: string }>;
  selected: string[];
  pause: boolean;
  handleRowClick: (e: MouseEvent, id: string | null) => void;
}

const AssetTable = (props: Props) => {
  const [
    sortedData,
    sortProperty,
    sortReverse,
    changeSorting
  ] = useTableSorting(props.tableData, props.columns[0].property);

  return (
    <div className={props.classes.root}>
      <Table>
        <AssetTableHead
          columns={props.columns}
          sortProperty={sortProperty}
          sortDirection={sortReverse ? "asc" : "desc"}
          changeSorting={changeSorting}
        />
        <TableBody>
          {sortedData.map(([rowId, rowData]) => (
            <AssetTableRow
              key={rowId}
              columns={props.columns}
              rowData={rowData}
              selected={props.selected.includes(rowId)}
              handleRowClick={(e: MouseEvent) => props.handleRowClick(e, rowId)}
            />
          ))}
        </TableBody>
      </Table>
      <div
        className={props.classes.belowTable}
        onClick={e => props.handleRowClick(e.nativeEvent, null)}
      />
    </div>
  );
};

const memoizedAssetTable = React.memo(
  AssetTable,
  (_, nextProps) => nextProps.pause
);

export default withStyles(styles)(memoizedAssetTable);
