import React from "react";
import { Table, TableBody, makeStyles } from "@material-ui/core";

import { useDeviceData } from "../hooks/useDeviceData";
import { useSelector, useDispatch } from "../redux/store";
import { singleRowSelect, multiRowSelect } from "../redux/actionCreators";
import DeviceTableHead from "./DeviceTableHead";
import DeviceTableRow from "./DeviceTableRow";
import FilterBar from "./FilterBar";

/** CSS-in-JS styling */
const useStyles = makeStyles({
  root: { display: "flex", height: "calc(100vh - 60px)" },
  table: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    whiteSpace: "nowrap",
    padding: "0px 16px",
    overflowX: "hidden",
    flex: 1,
    userSelect: "none"
  },
  belowTable: {
    flex: 1
  }
});

/**
 * Table listing all devices and with key details. Container for table header
 * component, filter bar component, and table row component for each device.
 * User may click on one or more rows to open toolbar with more options.
 * useDeviceData hook manages table data and state of filtering and sorting.
 */
const DeviceTable = (): JSX.Element => {
  /** Generated CSS class names */
  const classes = useStyles();
  /** Array of rows currently selected by user. */
  const selectedRows = useSelector((state) => state.userSelection.rows);
  const dispatch = useDispatch();
  const {
    deviceData, // Sorted and filtered data to populate table
    selectedFilters, // Currently enabled filters
    setFilters, // Function to add or remove filters
    selectedSorting, // Parameter the table is currently sorted by
    setSorting // Function to change sorting parameter
  } = useDeviceData();

  return (
    <div className={classes.root}>
      <FilterBar selectedFilters={selectedFilters} setFilters={setFilters} />

      <div className={classes.table}>
        <Table stickyHeader>
          <DeviceTableHead
            selectedSorting={selectedSorting}
            setSorting={setSorting}
          />
          <TableBody>
            {
              /** Generate table row for each device in data store. */
              deviceData.map(([rowId, rowData]) => (
                <DeviceTableRow
                  key={rowId}
                  rowData={rowData}
                  selected={selectedRows.includes(rowId)}
                  handleRowClick={(e: MouseEvent) => {
                    if (e.altKey || e.ctrlKey) dispatch(multiRowSelect(rowId));
                    else dispatch(singleRowSelect(rowId));
                  }}
                />
              ))
            }
          </TableBody>
        </Table>
        {/* Clear row selection when empty space is clicked. */}
        <div
          className={classes.belowTable}
          onClick={() => dispatch(singleRowSelect(null))}
        />
      </div>
    </div>
  );
};

export default DeviceTable;
