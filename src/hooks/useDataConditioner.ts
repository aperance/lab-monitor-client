import { useReducer, useContext } from "react";
import { ConfigurationContext } from "../configuration/ConfigurationContext";

type RowData = [string, { [x: string]: string | null }];

const selectedFilterReducer = (
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

const selectedSortingReducer = (
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

export const useDataConditioner = (rawData: RowData[]) => {
  const { columns } = useContext(ConfigurationContext);
  const [selectedFilters, filterDispatch] = useReducer(
    selectedFilterReducer,
    {} as { [x: string]: string[] }
  );
  const [selectedSorting, sortDispatch] = useReducer(selectedSortingReducer, {
    property: columns[0].property,
    reverse: false
  });

  const conditionedData = rawData
    .map(([id, rowData]) => {
      columns
        /** Filter out column config with no replacement rule */
        .filter(x => typeof x.replace !== "undefined")
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
      return [id, rowData] as [string, { [x: string]: string | null }];
    })
    .filter(([, rowData]) =>
      Object.entries(selectedFilters).every(
        ([property, regexArray]) =>
          !regexArray.every(regex => !(rowData[property] || "").match(regex)) ||
          regexArray.length === 0
      )
    )
    .sort((key1: RowData, key2: RowData) => {
      const prop =
        key1[1][selectedSorting.property] !== key2[1][selectedSorting.property]
          ? selectedSorting.property
          : columns[0].property;
      let result = (key1[1][prop] || "") > (key2[1][prop] || "");
      if (selectedSorting.reverse) result = !result;
      return result ? 1 : -1;
    });

  return [
    conditionedData,
    selectedFilters,
    (property, regex) => filterDispatch({ property, regex }),
    selectedSorting,
    property => sortDispatch({ property })
  ] as [
    RowData[],
    { [x: string]: string[] },
    (x: string, y: string) => void,
    { property: string; reverse: boolean },
    (x: string) => void
  ];
};
