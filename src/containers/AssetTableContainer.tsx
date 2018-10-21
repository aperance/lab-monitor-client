import * as React from "react";
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
    handleRowClick: (e: MouseEvent, id: string) => {
      if (e.altKey || e.ctrlKey) dispatch(multiRowSelect(id));
      else dispatch(singleRowSelect(id));
    }
  };
};

interface State {
  sortProperty: string | null;
  sortDirection: "asc" | "desc";
}

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
  handleRowClick: (e: MouseEvent, id: string) => void;
}

/**
 *
 */
class AssetTableContainer extends React.Component<Props, State> {
  public state: State = {
    sortProperty: null,
    sortDirection: "desc"
  };

  /**
   *
   */
  public static getDerivedStateFromProps(
    nextProps: Props,
    prevState: State
  ): State {
    // Use first column as default sort by property.
    // Only set if not already set, and column data is known.
    if (!prevState.sortProperty && nextProps.columns[0])
      return {
        sortProperty: nextProps.columns[0].property,
        sortDirection: "desc"
      };
    else return { ...prevState };
  }

  /**
   *
   */
  public changeSorting(property: string) {
    this.setState({
      sortProperty: property,
      sortDirection:
        this.state.sortProperty !== property
          ? "desc"
          : this.state.sortDirection === "desc"
            ? "asc"
            : "desc"
    });
  }

  /**
   *
   */
  public findAndReplace(tableData: RowData[]) {
    const columnsToModify = this.props.columns.filter(
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
  }

  /**
   *
   */
  public sortAndFilter(tableData: RowData[]) {
    return tableData
      .filter(([, rowData]) =>
        Object.entries(this.props.selectedFilters).every(
          ([property, regexArray]) =>
            !regexArray.every(
              regex => !(rowData[property] || "").match(regex)
            ) || regexArray.length === 0
        )
      )
      .sort((key1, key2) => {
        const prop = this.state.sortProperty;
        if (prop === null) return 1;
        let result = (key1[1][prop] || "") > (key2[1][prop] || "");
        if (this.state.sortDirection === "asc") result = !result;
        return result ? 1 : -1;
      });
  }

  public render() {
    return (
      <AssetTable
        tableData={this.sortAndFilter(
          this.findAndReplace(this.props.tableData)
        )}
        columns={this.props.columns}
        selected={this.props.selected}
        sortProperty={this.state.sortProperty}
        sortDirection={this.state.sortDirection}
        changeSorting={this.changeSorting.bind(this)}
        handleRowClick={this.props.handleRowClick.bind(this)}
      />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
  // @ts-ignore
)(AssetTableContainer);
