import * as React from "react";
import { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { WebsocketContext } from "../websockets/WebsocketContext";
import { StoreState } from "../reducers/index";
import { deviceCommandResponse, draggingSet } from "../actions/actionCreators";
import DeviceTable from "./DeviceTable";
import Toolbar from "./Toolbar";
import History from "./History";
import WebPage from "./WebPage";
import PsTools from "./PsTools";
import VncViewer from "./VncViewer";
import NavBar from "./NavBar";
import ErrorMessage from "./ErrorMessage";
import Spinner from "./Spinner";
import Drawers from "./Drawers";
import ActionResponse from "./ActionResponse";

const App = () => {
  const { status } = useContext(WebsocketContext);
  const store = useSelector((state: StoreState) => {
    return {
      dataReceived: Object.keys(state.tableData).length !== 0,
      subView: state.userSelection.view,
      drawersVisible: (state.userSelection.rows.length === 0
        ? 0
        : !state.userSelection.view
        ? 1
        : 2) as 0 | 1 | 2,
      deviceResponse: state.deviceResponse.command
    };
  });
  const dispatch = useDispatch();

  if (status === "connectionError")
    return <ErrorMessage message={"connectionError"} />;
  else if (status === "dataError")
    return <ErrorMessage message={"dataError"} />;
  else if (status === "connected" && store.dataReceived)
    return (
      <>
        <NavBar />

        <DeviceTable />

        <Drawers
          drawersVisible={store.drawersVisible}
          isResizing={(isDragging: boolean) =>
            dispatch(draggingSet({ isDragging }))
          }
          leftDrawer={<Toolbar />}
          rightDrawer={(() => {
            switch (store.subView) {
              case "history":
                return <History />;
              case "statePage":
                return <WebPage />;
              case "psTools":
                return <PsTools />;
              case "vnc":
                return <VncViewer />;
              default:
                return null;
            }
          })()}
        />

        <ActionResponse
          response={store.deviceResponse}
          handleClose={() =>
            dispatch(deviceCommandResponse({ err: null, results: null }))
          }
        />
      </>
    );
  else return <Spinner />;
};

export default App;
