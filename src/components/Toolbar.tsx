import React, { useContext, useState } from "react";
import { shallowEqual } from "react-redux";
import { List, Divider } from "@material-ui/core";

import config from "../configuration";
import { WebsocketContext } from "../contexts/WebsocketContext";
import { useSelector, useDispatch } from "../redux/store";
import { viewSelect } from "../redux/actionCreators";
import ToolbarItem from "./ToolbarItem";
import LogLevel from "./LogLevel";

/**
 * Toolbar displayed to user when a row is selected containing available
 * sub views and device actions (i.e. reboot).
 */
const Toolbar = (): JSX.Element => {
  const selectedRows = useSelector(
    (state) => state.userSelection.rows,
    shallowEqual // Needed for array comparison
  );
  const selectedSubView = useSelector((state) => state.userSelection.view);
  const isProxyEnabled = useSelector((state) => state.userSelection.proxy);
  const dispatch = useDispatch();
  const ws = useContext(WebsocketContext);
  const [logConfigOpen, setLogConfigOpen] = useState(false);

  return (
    <>
      <List draggable={false}>
        {selectedRows.length <= 1 && (
          <>
            <ToolbarItem
              name="State"
              leftIcon="list_alt"
              rightIcon="navigate_next"
              isSelected={selectedSubView === "statePage"}
              disabledOnDemo={true}
              onClick={() => dispatch(viewSelect("statePage"))}
            />
            <ToolbarItem
              name="History"
              leftIcon="history"
              rightIcon="navigate_next"
              isSelected={selectedSubView === "history"}
              onClick={() => dispatch(viewSelect("history"))}
            />
            <ToolbarItem
              name="PSTools"
              leftIcon="code"
              rightIcon="navigate_next"
              isSelected={selectedSubView === "psTools"}
              disabledOnDemo={true}
              onClick={() => dispatch(viewSelect("psTools"))}
            />
            <ToolbarItem
              name="VNC"
              leftIcon="picture_in_picture"
              rightIcon="navigate_next"
              isSelected={selectedSubView === "vnc"}
              onClick={() => dispatch(viewSelect("vnc"))}
            />

            {process.env.DEMO !== "true" && config.remoteAccess && (
              <>
                <Divider style={{ marginTop: "8px", marginBottom: "8px" }} />
                <ToolbarItem
                  name="Shared Drives"
                  leftIcon="folder"
                  rightIcon="get_app"
                  selectedRows={selectedRows}
                  onClick={() => {
                    const link = document.getElementById("downloadLink");
                    if (link !== null) link.click();
                  }}
                >
                  <a
                    id="downloadLink"
                    href={URL.createObjectURL(
                      new Blob(
                        [
                          `net use \\\\${selectedRows[0]} ` +
                            `/user:${config.remoteAccess.username} ` +
                            `${config.remoteAccess.username} ` +
                            `/PERSISTENT:NO\n` +
                            `start \\\\${selectedRows[0]}`
                        ],
                        { type: "text/plain" }
                      )
                    )}
                    target="_blank"
                    rel="noreferrer"
                    download="test.bat"
                  />
                </ToolbarItem>
              </>
            )}
            <Divider style={{ marginTop: "8px", marginBottom: "8px" }} />
            <ToolbarItem
              name="Logs"
              leftIcon="subject"
              rightIcon="open_in_new"
              selectedRows={selectedRows}
              disabledOnDemo={true}
              onClick={() => {
                const link = document.getElementById("logsLink");
                if (link !== null) link.click();
              }}
            >
              {isProxyEnabled ? (
                <a
                  id="logsLink"
                  href={
                    `http://${process.env.BACKEND}${config.logsPath}` +
                    `?target=${selectedRows[0]}`
                  }
                  target="_blank"
                  rel="noreferrer"
                />
              ) : (
                <a
                  id="logsLink"
                  href={`http://${selectedRows[0]}:8001${config.logsPath}`}
                  target="_blank"
                  rel="noreferrer"
                />
              )}
            </ToolbarItem>
            <Divider style={{ marginTop: "8px", marginBottom: "8px" }} />
          </>
        )}
        <ToolbarItem
          name="Log Level"
          leftIcon="tune"
          selectedRows={selectedRows}
          disabledOnDemo={true}
          onClick={() => setLogConfigOpen(true)}
        />
        <ToolbarItem
          name="Delete Logs"
          leftIcon="delete_sweep"
          selectedRows={selectedRows}
          disabledOnDemo={true}
          onClick={() => ws.commandRequest(selectedRows, "deleteLogs")}
        />
        <ToolbarItem
          name="Clean Start"
          leftIcon="power_settings_new"
          selectedRows={selectedRows}
          disabledOnDemo={true}
          onClick={() => ws.commandRequest(selectedRows, "cleanStart")}
        />
        <ToolbarItem
          name="RAM Clear"
          leftIcon="memory"
          selectedRows={selectedRows}
          disabledOnDemo={true}
          onClick={() => ws.commandRequest(selectedRows, "ramClear")}
        />
        <ToolbarItem
          name="Reset Display"
          leftIcon="desktop_windows"
          selectedRows={selectedRows}
          disabledOnDemo={true}
          onClick={() => ws.commandRequest(selectedRows, "resetDisplay")}
        />
        <Divider style={{ marginTop: "8px", marginBottom: "8px" }} />
        <ToolbarItem
          name="Force Refresh"
          leftIcon="refresh"
          selectedRows={selectedRows}
          disabledOnDemo={true}
          onClick={() => ws.refreshDevice(selectedRows)}
        />
        <ToolbarItem
          name="Clear Record"
          leftIcon="delete"
          selectedRows={selectedRows}
          disabledOnDemo={true}
          onClick={() => ws.clearDevice(selectedRows)}
        />
      </List>
      <LogLevel
        open={logConfigOpen}
        sendDeviceCommand={(namespace: string, level: string) =>
          ws.commandRequest(selectedRows, "logLevel", { namespace, level })
        }
        close={() => setLogConfigOpen(false)}
      />
    </>
  );
};

export default Toolbar;
