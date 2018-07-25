import * as React from "react";
import { connect } from "react-redux";
import { singleRowSelect, multiRowSelect } from "../actions/actionCreators";
import AssetTable from "../components/AssetTable";

interface ITableData {
  [id: string]: {
    [property: string]: string | null;
  };
}

interface IState {
  sortProperty: string | null;
  sortDirection: "asc" | "desc";
}

interface IProps {
  columns: any;
  selectedFilters: {
    [property: string]: string[];
  };
  selected: any;
  tableData: ITableData;
  handleRowClick: (e: MouseEvent, id: string) => void;
}

const mapStateToProps = (state: any) => {
  return {
    columns: state.configuration.columns,
    selectedFilters: state.userSelection.filters,
    selected: state.userSelection.rows,
    tableData: state.tableData
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

/**
 *
 */
class AssetTableContainer extends React.Component<IProps, IState> {
  public state: IState = {
    sortProperty: null,
    sortDirection: "desc"
  };

  /**
   *
   */
  public static getDerivedStateFromProps(nextProps: any, prevState: any) {
    // Use first column as default sort by property.
    // Only set if not already set, and column data is known.
    if (!prevState.sortProperty && nextProps.columns[0])
      return {
        sortProperty: nextProps.columns[0].property,
        sortDirection: "desc"
      };
    else return null;
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
  public sortAndFilter(tableData: ITableData) {
    return Object.entries(tableData)
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
        tableData={this.sortAndFilter(this.props.tableData)}
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
)(AssetTableContainer);
