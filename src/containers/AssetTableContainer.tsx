import { connect } from "react-redux";
import { StoreState } from "../reducers/index";
import { singleRowSelect, multiRowSelect } from "../actions/actionCreators";
import { AssetTable } from "../components/AssetTable";

interface ColumnConfig {
  property: string;
  replace: { [x: string]: string };
}

const mapStateToProps = (state: StoreState) => {
  const rawTableData = Object.entries(state.tableData);

  const replacementRules: ColumnConfig[] = state.configuration.columns
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
    Object.entries(state.userSelection.filters).every(
      ([property, regexArray]) =>
        !regexArray.every(regex => !(rowData[property] || "").match(regex)) ||
        regexArray.length === 0
    )
  );

  return {
    columns: state.configuration.columns,
    selected: state.userSelection.rows,
    tableData: filteredTableData
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

export const AssetTableContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AssetTable);
