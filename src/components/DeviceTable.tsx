import * as React from "react";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import { Table, TableBody } from "@material-ui/core";
import DeviceTableHead from "./DeviceTableHead";
import DeviceTableRow from "./DeviceTableRow";
import FilterBar from "./FilterBar";
import { useDataConditioner } from "../hooks/useDataConditioner";
import { ConfigurationContext } from "../configuration/ConfigurationContext";

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
  selected: string[];
  pause: boolean;
  proxyEnabled: boolean;
  handleProxyClick: () => void;
  handleRowClick: (e: MouseEvent, id: string | null) => void;
}

const DeviceTable = (props: Props) => {
  const { columns, filters } = React.useContext(ConfigurationContext);
  const [
    conditionedData,
    selectedFilters,
    toggleFilter,
    selectedSorting,
    changeSort
  ] = useDataConditioner(props.tableData);

  return (
    <div style={{ display: "flex", height: "calc(100vh - 60px)" }}>
      <FilterBar
        filters={filters}
        selectedFilters={selectedFilters}
        proxyEnabled={props.proxyEnabled}
        handleCheckboxClick={toggleFilter}
        handleProxyClick={props.handleProxyClick}
      />

      <div className={props.classes.root}>
        <Table>
          <DeviceTableHead
            columns={columns}
            selectedSorting={selectedSorting}
            changeSort={changeSort}
          />
          <TableBody>
            {conditionedData.map(([rowId, rowData]) => (
              <DeviceTableRow
                key={rowId}
                columns={columns}
                rowData={rowData}
                selected={props.selected.includes(rowId)}
                handleRowClick={(e: MouseEvent) =>
                  props.handleRowClick(e, rowId)
                }
              />
            ))}
          </TableBody>
        </Table>
        <div
          className={props.classes.belowTable}
          onClick={e => props.handleRowClick(e.nativeEvent, null)}
        />
      </div>
    </div>
  );
};

const memoizedDeviceTable = React.memo(
  DeviceTable,
  (_, nextProps) => nextProps.pause
);

export default withStyles(styles)(memoizedDeviceTable);
