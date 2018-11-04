import * as React from "react";
// @ts-ignore
import { useContext } from "react";
import { connect } from "react-redux";
import { StoreState } from "./types";
import { actionResponseClear } from "./actions/actionCreators";
import { WebsocketContext } from "./WebsocketProvider";
import AssetTableContainer from "./containers/AssetTableContainer";
import FilterBarContainer from "./containers/FilterBarContainer";
import ToolbarContainer from "./containers/ToolbarContainer";
import HistoryContainer from "./containers/HistoryContainer";
import WebPageContainer from "./containers/WebPageContainer";
import PsToolsContainer from "./containers/PsToolsContainer";
import VncContainer from "./containers/VncContainer";
import NavBar from "./components/NavBar";
import ErrorMessage from "./components/ErrorMessage";
import Spinner from "./components/Spinner";
import Drawers from "./components/Drawers";
import ActionResponse from "./components/ActionResponse";

interface Props {
  title: string;
  dataReceived: boolean;
  subView: string | null;
  drawersVisible: number;
  actionResponse: {
    err: Error | null;
    results: any[] | null;
  };
  actionResponseClose: () => void;
}

const Layout = (props: Props) => {
  const { status } = useContext(WebsocketContext);

  return status === "error" ? (
    <ErrorMessage message={"Unable to connect to server"} />
  ) : status === "disconnected" || !props.dataReceived ? (
    <Spinner />
  ) : (
    <>
      <NavBar title={props.title} />

      <div style={{ display: "flex", height: "calc(100vh - 60px)" }}>
        <FilterBarContainer />
        <AssetTableContainer />
      </div>

      <Drawers drawersVisible={props.drawersVisible}>
        <ToolbarContainer />
        {(() => {
          switch (props.subView) {
            case "history":
              return <HistoryContainer />;
            case "statePage":
              return <WebPageContainer />;
            case "psTools":
              return <PsToolsContainer />;
            case "vnc":
              return <VncContainer isDragging={false} />;
            default:
              return null;
          }
        })()}
      </Drawers>

      <ActionResponse
        response={props.actionResponse}
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
    subView: state.userSelection.view,
    drawersVisible:
      state.userSelection.rows[0] === undefined
        ? 0
        : state.userSelection.view === null
          ? 1
          : 2,
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
