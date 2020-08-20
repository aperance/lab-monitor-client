/**
 *
 * @packageDocumentation
 */

import React, {useContext} from "react";

import {WebsocketContext} from "../websockets/WebsocketContext";
import {useSelector} from "../redux/store";
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

/**
 *
 */
const App = () => {
  /** True if initial data payload received via web socket. */
  const isDataReceived = useSelector(
    state => Object.keys(state.tableData).length !== 0
  );
  /** Desired content for the rightmost drawer. */
  const selectedSubView = useSelector(state => state.userSelection.view);
  /** Number of drawers that should be visible to the user. */
  const drawersVisible = useSelector((state): 0 | 1 | 2 => {
    return state.userSelection.rows.length === 0
      ? 0
      : !state.userSelection.view
      ? 1
      : 2;
  });
  const wsStatus = useContext(WebsocketContext).status;

  if (wsStatus === "connectionError")
    return <ErrorMessage message={"connectionError"} />;
  else if (wsStatus === "dataError")
    return <ErrorMessage message={"dataError"} />;
  else if (wsStatus === "connected" && isDataReceived)
    return (
      <>
        <NavBar />

        <DeviceTable />

        <Drawers
          drawersVisible={drawersVisible}
          leftDrawer={<Toolbar />}
          rightDrawer={(() => {
            switch (selectedSubView) {
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

        <ActionResponse />
      </>
    );
  else return <Spinner />;
};

export default App;
