import { connect } from "react-redux";
import { StoreState, RowData } from "../types";
import { singleRowSelect, multiRowSelect } from "../actions/actionCreators";
import AssetTable from "../components/AssetTable";

interface ColumnConfig {
  property: string;
  replace: { [x: string]: string };
}

const mapStateToProps = (state: StoreState) => {
  const mapFunc = ([id, rowData]: RowData) => {
    state.configuration.columns
      /** Filter out column config with no replacement rule */
      .filter((x: any) => typeof x.replace !== "undefined")
      /** Iterate over column config with replacement rules */
      .forEach(({ property, replace }: ColumnConfig) => {
        if (replace && rowData[property] !== null) {
          /** Apply all replacemnt rules on rowData */
          Object.entries(replace).forEach(([replacement, matcher]) => {
            if ((rowData[property] as string).match(matcher))
              rowData[property] = replacement;
          });
        }
      });
    return [id, rowData] as RowData;
  };

  const filterFunc = ([, rowData]: RowData) =>
    Object.entries(state.userSelection.filters).every(
      ([property, regexArray]) =>
        !regexArray.every(regex => !(rowData[property] || "").match(regex)) ||
        regexArray.length === 0
    );

  return {
    columns: state.configuration.columns,
    selected: state.userSelection.rows,
    tableData: Object.entries(state.tableData)
      .map(mapFunc)
      .filter(filterFunc)
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssetTable);
