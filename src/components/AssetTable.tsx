import * as React from "react";
import { useState } from "react";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import { Table, TableBody } from "@material-ui/core";
import AssetTableHead from "./AssetTableHead";
import AssetTableRow from "./AssetTableRow";

type RowData = [string, { [x: string]: string | null }];

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
  tableData: RowData[];
  columns: Array<{ title: string; property: string }>;
  selected: string[];
  pause: boolean;
  handleRowClick: (e: MouseEvent, id: string | null) => void;
}

const AssetTable = (props: Props) => {
  const [sortProperty, setSortProperty] = useState(props.columns[0].property);
  const [sortReverse, setSortReverse] = useState(false);

  const changeSorting = (newSortProperty: string) => {
    if (newSortProperty === sortProperty) setSortReverse(!sortReverse);
    else {
      setSortProperty(newSortProperty);
      setSortReverse(false);
    }
  };

  const sortFunc = (key1: RowData, key2: RowData) => {
    const prop =
      key1[1][sortProperty] !== key2[1][sortProperty]
        ? sortProperty
        : props.columns[0].property;
    let result = (key1[1][prop] || "") > (key2[1][prop] || "");
    if (sortReverse) result = !result;
    return result ? 1 : -1;
  };

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
          {props.tableData.sort(sortFunc).map(([rowId, rowData]) => (
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
