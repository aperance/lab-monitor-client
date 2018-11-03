import * as React from "react";
// @ts-ignore
import { useContext } from "react";
import { connect } from "react-redux";
import { StoreState } from "./types";
import { actionResponseClear } from "./actions/actionCreators";
import { WebsocketContext } from "./WebsocketProvider";
import AssetTableContainer from "./containers/AssetTableContainer";
import FilterBarContainer from "./containers/FilterBarContainer";
import DrawersContainer from "./containers/DrawersContainer";
import ErrorMessage from "./components/ErrorMessage";
import Spinner from "./components/Spinner";
import NavBar from "./components/NavBar";
import ActionResponse from "./components/ActionResponse";

interface Props {
  title: string;
  dataReceived: boolean;
  actionResponse: { err: Error | null; results: any[] | null };
  actionResponseClose: () => void;
}

const Layout = (props: Props) => {
  const { status } = useContext(WebsocketContext);

  if (status === "error")
    return <ErrorMessage message={"Unable to connect to server"} />;

  return status === "disconnected" || !props.dataReceived ? (
    <Spinner />
  ) : (
    <>
      <NavBar title={props.title} />
      <div style={{ display: "flex", height: "calc(100vh - 60px)" }}>
        <FilterBarContainer />
        <AssetTableContainer />
      </div>
      <DrawersContainer />
      <ActionResponse
        err={props.actionResponse.err}
        results={props.actionResponse.results}
        handleClose={props.actionResponseClose}
      />
    </>
  );
};

const mapStateToProps = (state: StoreState) => {
  return {
    title: state.configuration.title,
    dataReceived:
      Object.keys(state.configuration).length !== 0 &&
      Object.keys(state.tableData).length !== 0,
    actionResponse: state.actionResponse
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    actionResponseClose: () => dispatch(actionResponseClear())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);
