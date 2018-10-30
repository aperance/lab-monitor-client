import * as React from "react";
// @ts-ignore
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { StoreState, RowData } from "../types";
import { singleRowSelect, multiRowSelect } from "../actions/actionCreators";
import AssetTable from "../components/AssetTable";

const mapStateToProps = (state: StoreState) => {
  return {
    columns: state.configuration.columns,
    selectedFilters: state.userSelection.filters,
    selected: state.userSelection.rows,
    tableData: Object.entries(state.tableData)
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    handleRowClick: (e: MouseEvent, id: string | null) => {
      if (e.altKey || e.ctrlKey) dispatch(multiRowSelect(id));
      else dispatch(singleRowSelect(id));
    }
  };
};

interface Props {
  columns: Array<{
    property: string;
    title: string;
    replace?: {
      [replacement: string]: string;
    };
  }>;
  selectedFilters: {
    [property: string]: string[];
  };
  selected: string[];
  tableData: RowData[];
  handleRowClick: (e: MouseEvent, id: string | null) => void;
}

/**
 *
 */
function AssetTableContainer(props: Props) {
  const [sortProperty, setSortProperty] = useState(null);
  const [sortDirection, setSortDirection] = useState("desc");

  useEffect(() => {
    setSortProperty(props.columns[0].property);
  }, []);

  /**
   *
   */
  const changeSorting = (property: string) => {
    setSortProperty(property);
    setSortDirection(
      sortProperty !== property
        ? "desc"
        : sortDirection === "desc"
          ? "asc"
          : "desc"
    );
  };

  /**
   *
   */
  const findAndReplace = (tableData: RowData[]) => {
    const columnsToModify = props.columns.filter(
      x => typeof x.replace !== "undefined"
    );
    return tableData.map(([id, rowData]) => {
      columnsToModify.forEach(({ property, replace }) => {
        if (replace && rowData[property] !== null) {
          Object.entries(replace).forEach(([replacement, matcher]) => {
            if ((rowData[property] as string).match(matcher))
              rowData[property] = replacement;
          });
        }
      });
      return [id, rowData] as RowData;
    });
  };

  /**
   *
   */
  const sortAndFilter = (tableData: RowData[]) => {
    return tableData
      .filter(([, rowData]) =>
        Object.entries(props.selectedFilters).every(
          ([property, regexArray]) =>
            !regexArray.every(
              regex => !(rowData[property] || "").match(regex)
            ) || regexArray.length === 0
        )
      )
      .sort((key1, key2) => {
        const prop = sortProperty;
        if (prop === null) return 1;
        let result = (key1[1][prop] || "") > (key2[1][prop] || "");
        if (sortDirection === "asc") result = !result;
        return result ? 1 : -1;
      });
  };

  return (
    <AssetTable
      tableData={sortAndFilter(findAndReplace(props.tableData))}
      columns={props.columns}
      selected={props.selected}
      sortProperty={sortProperty}
      sortDirection={sortDirection}
      changeSorting={changeSorting}
      handleRowClick={props.handleRowClick}
    />
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssetTableContainer);
