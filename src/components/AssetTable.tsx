import * as React from "react";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import AssetTableHead from "./AssetTableHead";
import AssetTableRow from "./AssetTableRow";

const styles = createStyles({
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    whiteSpace: "nowrap",
    margin: "0px 16px"
  },
  belowTable: {
    flex: 1
  }
});

interface Props extends WithStyles<typeof styles> {
  tableData: Array<
    [
      string, // id
      {
        [property: string]: string | null;
      }
    ]
  >;
  columns: Array<{
    title: string;
    property: string;
  }>;
  sortProperty: string | null;
  sortDirection: "asc" | "desc";
  selected: string[];
  changeSorting: (property: string) => void;
  handleRowClick: (e: MouseEvent, id: string | null) => void;
}

function AssetTable(props: Props) {
  return (
    <div className={props.classes.root}>
      <Table>
        <AssetTableHead
          columns={props.columns}
          sortProperty={props.sortProperty}
          sortDirection={props.sortDirection}
          changeSorting={props.changeSorting}
        />
        <TableBody>
          {props.tableData.map(([rowId, rowData]) => (
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
