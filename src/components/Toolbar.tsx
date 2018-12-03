import * as React from "react";
import { useContext, useState } from "react";
import { List, Divider } from "@material-ui/core";
import ToolbarItem from "./ToolbarItem";
import LogLevel from "./LogLevel";
import { WebsocketContext } from "../websockets/WebsocketContext";
import {
  deviceCommand,
  refreshDevice,
  clearDevice
} from "../websockets/messageCreators";
import { ConfigurationContext } from "../configuration/ConfigurationContext";

interface Props {
  view: string | null;
  rows: string[];
  proxyEnabled: boolean;
  handleViewClick: (view: string) => null;
}

const Toolbar = (props: Props) => {
  const ws = useContext(WebsocketContext);
  const { vnc, httpProxy, logsPath } = useContext(ConfigurationContext);
  const [logConfigOpen, setLogConfigOpen] = useState(false);

  return (
    <>
      <List draggable={false}>
        {props.rows.length <= 1 && (
          <>
            <ToolbarItem
              name="State"
              leftIcon="list_alt"
              rightIcon="navigate_next"
              isSelected={props.view === "statePage"}
              onClick={() => props.handleViewClick("statePage")}
            />
            <ToolbarItem
              name="History"
              leftIcon="history"
              rightIcon="navigate_next"
              isSelected={props.view === "history"}
              onClick={() => props.handleViewClick("history")}
            />
            <ToolbarItem
              name="PSTools"
              leftIcon="code"
              rightIcon="navigate_next"
              isSelected={props.view === "psTools"}
              onClick={() => props.handleViewClick("psTools")}
            />
            <ToolbarItem
              name="VNC"
              leftIcon="picture_in_picture"
              rightIcon="navigate_next"
              isSelected={props.view === "vnc"}
              onClick={() => props.handleViewClick("vnc")}
            />
            <Divider style={{ marginTop: "8px", marginBottom: "8px" }} />

            <ToolbarItem
              name="Shared Drives"
              leftIcon="folder"
              rightIcon="get_app"
              selectedRows={props.rows}
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
                      `net use \\\\${props.rows[0]} ` +
                        `/user:${vnc.username} ` +
                        `${vnc.password} ` +
                        `/PERSISTENT:NO\n` +
                        `start \\\\${props.rows[0]}`
                    ],
                    { type: "text/plain" }
                  )
                )}
                target="_blank"
                download="test.bat"
              />
            </ToolbarItem>
            <Divider style={{ marginTop: "8px", marginBottom: "8px" }} />
            <ToolbarItem
              name="Logs"
              leftIcon="subject"
              rightIcon="open_in_new"
              selectedRows={props.rows}
              onClick={() => {
                const link = document.getElementById("logsLink");
                if (link !== null) link.click();
              }}
            >
              {props.proxyEnabled ? (
                <a
                  id="logsLink"
                  target="_blank"
                  href={`http://${httpProxy}${logsPath}?target=${
                    props.rows[0]
                  }`}
                />
              ) : (
                <a
                  id="logsLink"
                  href={`http://${props.rows[0]}:8001${logsPath}`}
                  target="_blank"
                />
              )}
            </ToolbarItem>
            <Divider style={{ marginTop: "8px", marginBottom: "8px" }} />
          </>
        )}
        <ToolbarItem
          name="Log Level"
          leftIcon="tune"
          selectedRows={props.rows}
          onClick={() => setLogConfigOpen(true)}
        />
        <ToolbarItem
          name="Delete Logs"
          leftIcon="delete_sweep"
          selectedRows={props.rows}
          onClick={() => ws.send(deviceCommand(props.rows, "deleteLogs"))}
        />
        <ToolbarItem
          name="Clean Start"
          leftIcon="power_settings_new"
          selectedRows={props.rows}
          onClick={() => ws.send(deviceCommand(props.rows, "cleanStart"))}
        />
        <ToolbarItem
          name="RAM Clear"
          leftIcon="memory"
          selectedRows={props.rows}
          onClick={() => ws.send(deviceCommand(props.rows, "ramClear"))}
        />
        <ToolbarItem
          name="Reset Display"
          leftIcon="desktop_windows"
          selectedRows={props.rows}
          onClick={() => ws.send(deviceCommand(props.rows, "resetDisplay"))}
        />
        <Divider style={{ marginTop: "8px", marginBottom: "8px" }} />
        <ToolbarItem
          name="Force Refresh"
          leftIcon="refresh"
          selectedRows={props.rows}
          onClick={() => ws.send(refreshDevice(props.rows))}
        />
        <ToolbarItem
          name="Clear Record"
          leftIcon="delete"
          selectedRows={props.rows}
          onClick={() => ws.send(clearDevice(props.rows))}
        />
      </List>
      <LogLevel
        open={logConfigOpen}
        sendDeviceCommand={(namespace: string, level: string) =>
          ws.send(deviceCommand(props.rows, "logLevel", { namespace, level }))
        }
        close={() => setLogConfigOpen(false)}
      />
    </>
  );
};
export default Toolbar;
