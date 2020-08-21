/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {useContext, useReducer} from "react";
import {ConfigurationContext} from "../configuration/ConfigurationContext";
import {useSelector} from "../redux/store";

type RowData = [string, {[x: string]: string | null}];

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

export const useDeviceData = () => {
  const columns = useContext(ConfigurationContext).columns;
  const rawData = useSelector(state => Object.entries(state.tableData));
  const [selectedFilters, setFilters] = useReducer(filterReducer, {});
  const [selectedSorting, setSorting] = useReducer(sortingReducer, {
    property: columns[0].property,
    reverse: false
  });

  /**
   *
   */
  const replaceFunction = ([id, rowData]: RowData): RowData => {
    columns
      /** Filter out column config with no replacement rule */
      .filter(x => typeof x.replace !== "undefined")
      /** Iterate over column config with replacement rules */
      .forEach(({property, replace}) => {
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

  const filterFunction = ([, rowData]: RowData): boolean =>
    Object.entries(selectedFilters).every(
      ([property, regexArray]) =>
        !regexArray.every(regex => !(rowData[property] || "").match(regex)) ||
        regexArray.length === 0
    );

  const sortFunction = (key1: RowData, key2: RowData): 1 | -1 => {
    const prop =
      key1[1][selectedSorting.property] !== key2[1][selectedSorting.property]
        ? selectedSorting.property
        : columns[0].property;
    let result = (key1[1][prop] || "") > (key2[1][prop] || "");
    if (selectedSorting.reverse) result = !result;
    return result ? 1 : -1;
  };

  const conditionedData = rawData
    .map(replaceFunction)
    .filter(filterFunction)
    .sort(sortFunction);

  return {
    deviceData: conditionedData,
    selectedFilters,
    setFilters,
    selectedSorting,
    setSorting
  };
};
