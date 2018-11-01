import * as React from "react";
// @ts-ignore
import { useContext } from "react";
import { connect } from "react-redux";
import { StoreState } from "./types";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import { WebsocketContext } from "./WebsocketProvider";
import NavBarContainer from "./containers/NavBarContainer";
import AssetTableContainer from "./containers/AssetTableContainer";
import FilterBarContainer from "./containers/FilterBarContainer";
import DrawersContainer from "./containers/DrawersContainer";
import LogLevelContainer from "./containers/LogLevelContainer";
import ActionResponseContainer from "./containers/ActionResponseContainer";
import Spinner from "./components/Spinner";
import ErrorMessage from "./components/ErrorMessage";

const styles = createStyles({
  root: {
    height: "calc(100vh - 80px)",
    paddingTop: "68px",
    display: "flex",
    overflowX: "hidden"
  },
  filter: { flex: 0, borderRight: "1px solid #0000001f" },
  table: { flex: 1 }
});

const mapStateToProps = (state: StoreState) => {
  return {
    dataReceived:
      Object.keys(state.configuration).length !== 0 &&
      Object.keys(state.tableData).length !== 0
  };
};

interface Props extends WithStyles<typeof styles> {
  dataReceived: boolean;
}

const Layout = (props: Props) => {
  const { status } = useContext(WebsocketContext);

  if (status === "error")
    return <ErrorMessage message={"Unable to connect to server"} />;

  if (status === "disconnected" || !props.dataReceived) return <Spinner />;

  return (
    <>
      <NavBarContainer />
      <div className={props.classes.root}>
        <div className={props.classes.filter}>
          <FilterBarContainer />
        </div>
        <div className={props.classes.table}>
          <AssetTableContainer />
        </div>
      </div>
      <DrawersContainer />
      <LogLevelContainer />
      <ActionResponseContainer />
    </>
  );
};

export default withStyles(styles)(connect(mapStateToProps)(Layout));
