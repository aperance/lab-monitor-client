import React, { useContext } from "react";
import {
  makeStyles,
  Dialog,
  DialogContent,
  DialogContentText,
  CircularProgress
} from "@material-ui/core";

import { WebsocketContext } from "../contexts/WebsocketContext";
import { useSelector } from "../redux/store";
import ActionResponse from "./ActionResponse";
import DeviceTable from "./DeviceTable";
import NavBar from "./NavBar";
import Drawers from "./Drawers";
import Toolbar from "./Toolbar";
import History from "./History";
import PsTools from "./PsTools";
import VncViewer from "./VncViewer";
import WebPage from "./WebPage";

/** CSS-in-JS styling */
const useStyles = makeStyles({
  spinner: {
    height: "90vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
});

/**
 * Primary component of app. When connected to backend this component will
 * render the app layout. When disconnected a circular progress indicator is
 * rendered. If an error occurs while connecting to backend that message will
 * be rendered.
 */
const App = (): JSX.Element => {
  /** Generated CSS class names */
  const classes = useStyles();
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
    return (
      <span className={classes.spinner}>
        <CircularProgress size={60} />
      </span>
    );
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
