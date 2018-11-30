type TableData = Array<[string, { [x: string]: string | null }]>;

interface ColumnConfig {
  property: string;
  replace: { [x: string]: string };
}

export const useTableReplacing = (rawData: TableData, columns: any) => {
  const replacementRules: ColumnConfig[] = columns
    /** Filter out column config with no replacement rule */
    .filter((x: any) => typeof x.replace !== "undefined");

  const tableDataWithReplacements = rawData.map(([id, rowData]) => {
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

  return [tableDataWithReplacements];
};
