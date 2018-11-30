import { useReducer } from "react";

type TableData = Array<[string, { [x: string]: string | null }]>;

interface SelectedFilters {
  [property: string]: string[];
}

const selectedFilterReducer = (
  selectedFilters: SelectedFilters,
  action: { property: string; regex: string }
) => {
  const regexArray = selectedFilters[action.property] || [];
  const currentIndex = regexArray.indexOf(action.regex);
  currentIndex === -1
    ? regexArray.push(action.regex)
    : regexArray.splice(currentIndex, 1);
  return { ...selectedFilters, [action.property]: regexArray };
};

export const useTableFiltering = (rawData: TableData) => {
  const [selectedFilters, dispatch] = useReducer(
    selectedFilterReducer,
    {} as SelectedFilters
  );

  const filteredTableData = rawData.filter(([, rowData]) =>
    Object.entries(selectedFilters).every(
      ([property, regexArray]) =>
        !regexArray.every(regex => !(rowData[property] || "").match(regex)) ||
        regexArray.length === 0
    )
  );

  return [
    filteredTableData,
    selectedFilters,
    (property, regex) => dispatch({ property, regex })
  ] as [TableData, SelectedFilters, (x: string, y: string) => void];
};
