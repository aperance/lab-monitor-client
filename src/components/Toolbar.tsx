import * as React from "react";
// @ts-ignore
import { useContext, useState } from "react";
import {
  WsMessageTypeKeys,
  DeviceActionRequest,
  RefreshDeviceRequest,
  ClearDeviceRequest
} from "../types";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ToolbarItem from "./ToolbarItem";
import { WebsocketContext } from "../WebsocketProvider";
import LogLevel from "../components/LogLevel";

interface Props {
  view: string | null;
  rows: string[];
  logsUrl?: string;
  fileContents?: string;
  logLevels: string[];
  logNamespaces: string[];
  handleViewClick: (view: string) => null;
}

function Toolbar(props: Props) {
  const ws = useContext(WebsocketContext);
  const [logConfigOpen, setLogConfigOpen] = useState(false);

  const sendDeviceAction = (type: string, parameters: any = {}) => {
    ws.sendToServer({
      type: WsMessageTypeKeys.DeviceAction,
      payload: { targets: props.rows, type, parameters } as DeviceActionRequest
    });
  };

  const sendRefreshDevice = () => {
    ws.sendToServer({
      type: WsMessageTypeKeys.RefreshDevice,
      payload: { targets: props.rows } as RefreshDeviceRequest
    });
  };

  const sendClearDevice = () => {
    ws.sendToServer({
      type: WsMessageTypeKeys.ClearDevice,
      payload: { targets: props.rows } as ClearDeviceRequest
    });
  };

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
                href={
                  props.fileContents &&
                  URL.createObjectURL(
                    new Blob([props.fileContents], { type: "text/plain" })
                  )
                }
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
              <a id="logsLink" href={props.logsUrl} target="_blank" />
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
          onClick={() => sendDeviceAction("deleteLogs")}
        />
        <ToolbarItem
          name="Clean Start"
          leftIcon="power_settings_new"
          selectedRows={props.rows}
          onClick={() => sendDeviceAction("cleanStart")}
        />
        <ToolbarItem
          name="RAM Clear"
          leftIcon="memory"
          selectedRows={props.rows}
          onClick={() => sendDeviceAction("ramClear")}
        />
        <ToolbarItem
          name="Reset Display"
          leftIcon="desktop_windows"
          selectedRows={props.rows}
          onClick={() => sendDeviceAction("resetDisplay")}
        />
        <Divider style={{ marginTop: "8px", marginBottom: "8px" }} />
        <ToolbarItem
          name="Force Refresh"
          leftIcon="refresh"
          selectedRows={props.rows}
          onClick={sendRefreshDevice}
        />
        <ToolbarItem
          name="Clear Record"
          leftIcon="delete"
          selectedRows={props.rows}
          onClick={sendClearDevice}
        />
      </List>
      <LogLevel
        open={logConfigOpen}
        targets={props.rows}
        levels={props.logLevels}
        namespaces={props.logNamespaces}
        sendDeviceAction={sendDeviceAction}
        cancelLogLevel={() => setLogConfigOpen(false)}
      />
    </>
  );
}
export default Toolbar;
