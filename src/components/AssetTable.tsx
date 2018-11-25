import * as React from "react";
import { useState, useEffect } from "react";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import { Table, TableBody } from "@material-ui/core";
import AssetTableHead from "./AssetTableHead";
import AssetTableRow from "./AssetTableRow";

type RowData = [
  string,
  {
    [x: string]: string | null;
  }
];

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
  handleRowClick: (e: MouseEvent, id: string | null) => void;
}

function AssetTable(props: Props) {
  const [sortProperty, setSortProperty] = useState(null as string | null);
  const [sortReverse, setSortReverse] = useState(false);

  useEffect(() => {
    setSortProperty(props.columns[0].property);
  }, []);

  const changeSorting = (newSortProperty: string) => {
    if (newSortProperty === sortProperty) setSortReverse(!sortReverse);
    else {
      setSortProperty(newSortProperty);
      setSortReverse(false);
    }
  };

  const sortFunc = (key1: RowData, key2: RowData) => {
    // @ts-ignore
    let result = (key1[1][sortProperty] || "") > (key2[1][sortProperty] || "");
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
}

export default withStyles(styles)(AssetTable);
