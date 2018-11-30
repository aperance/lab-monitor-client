import { useState } from "react";

type RowData = [string, { [x: string]: string | null }];

export const useTableSorting = (
  rawData: RowData[],
  defaultSortProperty: string
) => {
  const [sortProperty, setSortProperty] = useState(defaultSortProperty);
  const [sortReverse, setSortReverse] = useState(false);

  const changeSorting = (newSortProperty: string) => {
    if (newSortProperty === sortProperty) setSortReverse(!sortReverse);
    else {
      setSortProperty(newSortProperty);
      setSortReverse(false);
    }
  };

  const sortedData = rawData.sort((key1: RowData, key2: RowData) => {
    const prop =
      key1[1][sortProperty] !== key2[1][sortProperty]
        ? sortProperty
        : defaultSortProperty;
    let result = (key1[1][prop] || "") > (key2[1][prop] || "");
    if (sortReverse) result = !result;
    return result ? 1 : -1;
  });

  return [sortedData, sortProperty, sortReverse, changeSorting] as [
    RowData[],
    string,
    boolean,
    (x: string) => void
  ];
};
