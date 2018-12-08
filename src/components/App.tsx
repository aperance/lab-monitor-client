import * as React from "react";
import { useContext } from "react";
import { WebsocketContext } from "../websockets/WebsocketContext";
import AssetTableContainer from "../containers/AssetTableContainer";
import ToolbarContainer from "../containers/ToolbarContainer";
import HistoryContainer from "../containers/HistoryContainer";
import WebPageContainer from "../containers/WebPageContainer";
import PsToolsContainer from "../containers/PsToolsContainer";
import VncContainer from "../containers/VncContainer";
import NavBar from "./NavBar";
import ErrorMessage from "./ErrorMessage";
import Spinner from "./Spinner";
import Drawers from "./Drawers";
import ActionResponse from "./ActionResponse";

interface Props {
  dataReceived: boolean;
  subView: string | null;
  drawersVisible: 0 | 1 | 2;
  actionResponse: {
    err: Error | null;
    results: any[] | null;
  };
  actionResponseClose: () => void;
  draggingSet: (x: boolean) => void;
}

const App = (props: Props) => {
  const { status } = useContext(WebsocketContext);

  if (status === "connectionError")
    return <ErrorMessage message={"connectionError"} />;
  else if (status === "dataError")
    return <ErrorMessage message={"dataError"} />;
  else if (status === "connected" && props.dataReceived)
    return (
      <>
        <NavBar />

        <AssetTableContainer />

        <Drawers
          drawersVisible={props.drawersVisible}
          isResizing={props.draggingSet}
          leftDrawer={<ToolbarContainer />}
          rightDrawer={(() => {
            switch (props.subView) {
              case "history":
                return <HistoryContainer />;
              case "statePage":
                return <WebPageContainer />;
              case "psTools":
                return <PsToolsContainer />;
              case "vnc":
                return <VncContainer />;
              default:
                return null;
            }
          })()}
        />

        <ActionResponse
          response={props.actionResponse}
          handleClose={props.actionResponseClose}
        />
      </>
    );
  else return <Spinner />;
};

export default App;
