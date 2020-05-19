import * as React from "react";
import {useContext, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {List, Divider} from "@material-ui/core";
import ToolbarItem from "./ToolbarItem";
import LogLevel from "./LogLevel";
import {WebsocketContext} from "../websockets/WebsocketContext";
import {StoreState} from "../reducers/index";
import {viewSelect} from "../actions/actionCreators";
import {
  commandRequest,
  refreshDevice,
  clearDevice
} from "../websockets/messageCreators";
import {ConfigurationContext} from "../configuration/ConfigurationContext";

const Toolbar = () => {
  const ws = useContext(WebsocketContext);
  const {vnc, httpProxy, logsPath} = useContext(ConfigurationContext);
  const [logConfigOpen, setLogConfigOpen] = useState(false);
  const rows = useSelector((x: StoreState) => x.userSelection.rows);
  const view = useSelector((x: StoreState) => x.userSelection.view);
  const proxyEnabled = useSelector((x: StoreState) => x.userSelection.proxy);
  const dispatch = useDispatch();

  return (
    <>
      <List draggable={false}>
        {rows.length <= 1 && (
          <>
            <ToolbarItem
              name="State"
              leftIcon="list_alt"
              rightIcon="navigate_next"
              isSelected={view === "statePage"}
              onClick={() => dispatch(viewSelect({view: "statePage"}))}
            />
            <ToolbarItem
              name="History"
              leftIcon="history"
              rightIcon="navigate_next"
              isSelected={view === "history"}
              onClick={() => dispatch(viewSelect({view: "history"}))}
            />
            {process.env.DEMO !== "true" && (
              <ToolbarItem
                name="PSTools"
                leftIcon="code"
                rightIcon="navigate_next"
                isSelected={view === "psTools"}
                onClick={() => dispatch(viewSelect({view: "psTools"}))}
              />
            )}
            <ToolbarItem
              name="VNC"
              leftIcon="picture_in_picture"
              rightIcon="navigate_next"
              isSelected={view === "vnc"}
              onClick={() => dispatch(viewSelect({view: "vnc"}))}
            />

            {process.env.DEMO !== "true" && (
              <>
                <Divider style={{marginTop: "8px", marginBottom: "8px"}} />
                <ToolbarItem
                  name="Shared Drives"
                  leftIcon="folder"
                  rightIcon="get_app"
                  selectedRows={rows}
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
                          `net use \\\\${rows[0]} ` +
                            `/user:${vnc.username} ` +
                            `${vnc.password} ` +
                            `/PERSISTENT:NO\n` +
                            `start \\\\${rows[0]}`
                        ],
                        {type: "text/plain"}
                      )
                    )}
                    target="_blank"
                    download="test.bat"
                  />
                </ToolbarItem>
              </>
            )}
            <Divider style={{marginTop: "8px", marginBottom: "8px"}} />
            <ToolbarItem
              name="Logs"
              leftIcon="subject"
              rightIcon="open_in_new"
              selectedRows={rows}
              onClick={() => {
                const link = document.getElementById("logsLink");
                if (link !== null) link.click();
              }}
            >
              {proxyEnabled ? (
                <a
                  id="logsLink"
                  target="_blank"
                  href={`http://${httpProxy}${logsPath}?target=${rows[0]}`}
                />
              ) : (
                <a
                  id="logsLink"
                  href={`http://${rows[0]}:8001${logsPath}`}
                  target="_blank"
                />
              )}
            </ToolbarItem>
            <Divider style={{marginTop: "8px", marginBottom: "8px"}} />
          </>
        )}
        {process.env.DEMO !== "true" && (
          <ToolbarItem
            name="Log Level"
            leftIcon="tune"
            selectedRows={rows}
            onClick={() => setLogConfigOpen(true)}
          />
        )}
        <ToolbarItem
          name="Delete Logs"
          leftIcon="delete_sweep"
          selectedRows={rows}
          onClick={() => ws.send(commandRequest(rows, "deleteLogs"))}
        />
        <ToolbarItem
          name="Clean Start"
          leftIcon="power_settings_new"
          selectedRows={rows}
          onClick={() => ws.send(commandRequest(rows, "cleanStart"))}
        />
        <ToolbarItem
          name="RAM Clear"
          leftIcon="memory"
          selectedRows={rows}
          onClick={() => ws.send(commandRequest(rows, "ramClear"))}
        />
        <ToolbarItem
          name="Reset Display"
          leftIcon="desktop_windows"
          selectedRows={rows}
          onClick={() => ws.send(commandRequest(rows, "resetDisplay"))}
        />
        <Divider style={{marginTop: "8px", marginBottom: "8px"}} />
        <ToolbarItem
          name="Force Refresh"
          leftIcon="refresh"
          selectedRows={rows}
          onClick={() => ws.send(refreshDevice(rows))}
        />
        <ToolbarItem
          name="Clear Record"
          leftIcon="delete"
          selectedRows={rows}
          onClick={() => ws.send(clearDevice(rows))}
        />
      </List>
      <LogLevel
        open={logConfigOpen}
        sendDeviceCommand={(namespace: string, level: string) =>
          ws.send(commandRequest(rows, "logLevel", {namespace, level}))
        }
        close={() => setLogConfigOpen(false)}
      />
    </>
  );
};
export default Toolbar;
