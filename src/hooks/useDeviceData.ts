import {useContext} from "react";
import {useSelector} from "react-redux";
import {ConfigurationContext} from "../configuration/ConfigurationContext";
import {StoreState} from "../redux/store";

type RowData = [string, {[x: string]: string | null}];

export const useDeviceData = (
  selectedFilters: {[x: string]: string[]},
  selectedSorting: {property: string; reverse: boolean}
) => {
  const {columns} = useContext(ConfigurationContext);
  const rawData = useSelector((x: StoreState) => Object.entries(x.tableData));
  // const pause = useSelector((x: StoreState) => x.userSelection.dragging);

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

  return conditionedData;
};
