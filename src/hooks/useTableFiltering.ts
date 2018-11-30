type RowData = [string, { [x: string]: string | null }];

interface ColumnConfig {
  property: string;
  replace: { [x: string]: string };
}

interface SelectedFilters {
  [property: string]: string[];
}

export const useTableFiltering = (
  rawTableData: RowData[],
  selectedFilters: SelectedFilters,
  columns: any
) => {
  const replacementRules: ColumnConfig[] = columns
    /** Filter out column config with no replacement rule */
    .filter((x: any) => typeof x.replace !== "undefined");

  const tableDataWithReplacements = rawTableData.map(([id, rowData]) => {
    /** Iterate over column config with replacement rules */
    replacementRules.forEach(({ property, replace }) => {
      if (replace && rowData[property] !== null) {
        /** Apply all replacemnt rules on rowData */
        Object.entries(replace).forEach(([replacement, matcher]) => {
          if ((rowData[property] as string).match(matcher))
            rowData[property] = replacement;
        });
      }
    });
    return [id, rowData] as [string, { [x: string]: string | null }];
  });

  const filteredTableData = tableDataWithReplacements.filter(([, rowData]) =>
    Object.entries(selectedFilters).every(
      ([property, regexArray]) =>
        !regexArray.every(regex => !(rowData[property] || "").match(regex)) ||
        regexArray.length === 0
    )
  );

  return [filteredTableData];
};
