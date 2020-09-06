import { useReducer } from "react";

import config from "../configuration";
import { useSelector } from "../redux/store";

/**
 * Shape of table data for each device.
 *
 * [(device ID), Record<(property key), (property value)>]
 */
type RowData = [string, Record<string, string | null>];

/**
 * Shape of useDeviceData hook return value.
 */
type UseDeviceData = {
  deviceData: RowData[];
  selectedFilters: { [x: string]: string[] };
  setFilters: React.Dispatch<{ property: string; regex: string }>;
  selectedSorting: { property: string; reverse: boolean };
  setSorting: React.Dispatch<{ property: string }>;
};

/**
 * Reducer for updates to selected filter state. On action will add filter
 * if not already included or remove filter if it is already included.
 */
const filterReducer = (
  selectedFilters: { [x: string]: string[] },
  action: { property: string; regex: string }
) => {
  const regexArray = selectedFilters[action.property] || [];
  const currentIndex = regexArray.indexOf(action.regex);
  currentIndex === -1
    ? regexArray.push(action.regex)
    : regexArray.splice(currentIndex, 1);
  return { ...selectedFilters, [action.property]: regexArray };
};

/**
 * Reducer for updates to selected sorting state. On action will change
 * sorting to new property if different than current property, or toggle
 * sort direction if same as current property.
 */
const sortingReducer = (
  selectedSorting: { property: string; reverse: boolean },
  action: { property: string }
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
 * Custom hook that pulls table data from redux store, properly formats
 * values, and applies any enabled filters or sorting.
 */
export const useDeviceData = (): UseDeviceData => {
  const rawData = useSelector((state) => Object.entries(state.tableData));
  const [selectedFilters, setFilters] = useReducer(filterReducer, {});
  const [selectedSorting, setSorting] = useReducer(sortingReducer, {
    property: config.columns[0].property,
    reverse: false
  });

  /**
   * Function to replace cryptic internal state values with versions
   * formatted to be more clear to user, as specified in config.json.
   */
  const replaceFunction = ([id, rowData]: RowData): RowData => {
    config.columns
      /** Filter out column config with no replacement rule */
      .filter((x) => typeof x.replace !== "undefined")
      /** Iterate over column config with replacement rules */
      .forEach(({ property, replace }) => {
        if (replace && rowData[property] !== null) {
          /** Apply all replacemnt rules on rowData */
          Object.entries(replace).forEach(([replacement, matcher]) => {
            if ((rowData[property] as string).match(matcher))
              rowData[property] = replacement;
          });
        }
      });
    return [id, rowData];
  };

  /**
   * Function to filter device data by all selected filters.
   */
  const filterFunction = ([, rowData]: RowData): boolean =>
    Object.entries(selectedFilters).every(
      ([property, regexArray]) =>
        !regexArray.every((regex) => !(rowData[property] || "").match(regex)) ||
        regexArray.length === 0
    );

  /**
   * Filter to sort device data by selected property and direction.
   */
  const sortFunction = (key1: RowData, key2: RowData): 1 | -1 => {
    const prop =
      key1[1][selectedSorting.property] !== key2[1][selectedSorting.property]
        ? selectedSorting.property
        : config.columns[0].property;
    let result = (key1[1][prop] || "") > (key2[1][prop] || "");
    if (selectedSorting.reverse) result = !result;
    return result ? 1 : -1;
  };

  return {
    deviceData: rawData
      .map(replaceFunction)
      .filter(filterFunction)
      .sort(sortFunction),
    selectedFilters,
    setFilters,
    selectedSorting,
    setSorting
  };
};
