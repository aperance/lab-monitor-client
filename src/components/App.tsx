import * as React from "react";
import { useContext } from "react";
import { WebsocketContext } from "../websockets/WebsocketContext";
import { AssetTableContainer } from "../containers/AssetTableContainer";
import { FilterBarContainer } from "../containers/FilterBarContainer";
import { ToolbarContainer } from "../containers/ToolbarContainer";
import { HistoryContainer } from "../containers/HistoryContainer";
import { WebPageContainer } from "../containers/WebPageContainer";
import { PsToolsContainer } from "../containers/PsToolsContainer";
import { VncContainer } from "../containers/VncContainer";
import { NavBar } from "./NavBar";
import { ErrorMessage } from "./ErrorMessage";
import { Spinner } from "./Spinner";
import { Drawers } from "./Drawers";
import { ActionResponse } from "./ActionResponse";

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

const App = (props: Props) => {
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

export { App };
