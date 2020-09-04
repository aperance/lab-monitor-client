/**
 *
 * @packageDocumentation
 */

import React, { useContext } from "react";
import { Dialog, DialogContent, DialogContentText } from "@material-ui/core";

import { WebsocketContext } from "../contexts/WebsocketContext";
import { useSelector } from "../redux/store";
import DeviceTable from "./DeviceTable";
import Toolbar from "./Toolbar";
import History from "./History";
import WebPage from "./WebPage";
import PsTools from "./PsTools";
import VncViewer from "./VncViewer";
import NavBar from "./NavBar";
import Spinner from "./Spinner";
import Drawers from "./Drawers";
import ActionResponse from "./ActionResponse";

const App = (): JSX.Element => {
  /** True if initial data payload received via web socket. */
  const isDataReceived = useSelector(
    ({ tableData }) => Object.keys(tableData).length !== 0
  );
  /** Desired content for the rightmost drawer. */
  const selectedSubView = useSelector((state) => state.userSelection.view);
  /** Status of websocket connection to backend server. */
  const wsStatus = useContext(WebsocketContext).status;

  /** Display spinner if connection pending. */
  if (
    wsStatus === "disconnected" ||
    (wsStatus === "connected" && isDataReceived === false)
  ) {
    return <Spinner />;
  }

  /** Display full layout once data is received. */
  if (wsStatus === "connected" && isDataReceived === true) {
    return (
      <>
        <NavBar />

        <DeviceTable />

        <Drawers
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
  }

  /** Display error to user. */
  return (
    <Dialog open={true}>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {wsStatus === "connectionError" &&
            "Error: Disconnected from server. See console for details."}
          {wsStatus === "dataError" &&
            "Error: Invalid data received. See console for details."}
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default App;
