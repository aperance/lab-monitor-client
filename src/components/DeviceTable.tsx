/**
 *
 * @packageDocumentation
 */

import React, {useContext, useReducer} from "react";
import {Table, TableBody, makeStyles} from "@material-ui/core";

import {useDeviceData} from "../hooks/useDeviceData";
import {ConfigurationContext} from "../configuration/ConfigurationContext";
import {useSelector, useDispatch} from "../redux/store";
import {singleRowSelect, multiRowSelect} from "../redux/actionCreators";
import DeviceTableHead from "./DeviceTableHead";
import DeviceTableRow from "./DeviceTableRow";
import FilterBar from "./FilterBar";

/**
 * CSS-in-JS styling.
 * @hidden
 */
const useStyles = makeStyles({
  root: {
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
 *
 * @param selectedFilters
 * @param action
 */
const filterReducer = (
  selectedFilters: {[x: string]: string[]},
  action: {property: string; regex: string}
) => {
  const regexArray = selectedFilters[action.property] || [];
  const currentIndex = regexArray.indexOf(action.regex);
  currentIndex === -1
    ? regexArray.push(action.regex)
    : regexArray.splice(currentIndex, 1);
  return {...selectedFilters, [action.property]: regexArray};
};

/**
 *
 * @param selectedSorting
 * @param action
 */
const sortingReducer = (
  selectedSorting: {property: string; reverse: boolean},
  action: {property: string}
) => {
  return {
    property: action.property,
    reverse:
      action.property === selectedSorting.property
        ? !selectedSorting.reverse
        : selectedSorting.reverse
  };
};

/**
 *
 */
const DeviceTable = () => {
  const classes = useStyles();
  /** Array of rows currently selected by user. */
  const selectedRows = useSelector(state => state.userSelection.rows);
  const dispatch = useDispatch();
  const columns = useContext(ConfigurationContext).columns;
  const [selectedFilters, setFilters] = useReducer(filterReducer, {});
  const [selectedSorting, setSorting] = useReducer(sortingReducer, {
    property: columns[0].property,
    reverse: false
  });
  const deviceData = useDeviceData(selectedFilters, selectedSorting);

  return (
    <div style={{display: "flex", height: "calc(100vh - 60px)"}}>
      <FilterBar
        selectedFilters={selectedFilters}
        handleCheckboxClick={(property: string, regex: string) =>
          setFilters({property, regex})
        }
      />

      <div className={classes.root}>
        <Table stickyHeader>
          <DeviceTableHead
            columns={columns}
            selectedSorting={selectedSorting}
            changeSort={(property: string) => setSorting({property})}
          />
          <TableBody>
            {deviceData.map(([rowId, rowData]) => (
              <DeviceTableRow
                key={rowId}
                columns={columns}
                rowData={rowData}
                selected={selectedRows.includes(rowId)}
                handleRowClick={(e: MouseEvent) => {
                  if (e.altKey || e.ctrlKey)
                    dispatch(multiRowSelect({row: rowId}));
                  else dispatch(singleRowSelect({row: rowId}));
                }}
              />
            ))}
          </TableBody>
        </Table>
        <div
          className={classes.belowTable}
          onClick={() => dispatch(singleRowSelect({row: null}))}
        />
      </div>
    </div>
  );
};

export default DeviceTable;
