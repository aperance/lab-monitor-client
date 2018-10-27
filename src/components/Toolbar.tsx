import * as React from "react";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ToolbarItem from "./ToolbarItem";
import {
  sendDeviceAction,
  sendRefreshDevice,
  sendClearDevice
} from "../messageHandler";

interface Props {
  view: string | null;
  rows: string[];
  logsUrl?: string;
  fileContents?: string;
  handleViewClick: (view: string) => null;
  openLogLevel: () => void;
}

const Toolbar = (props: Props) => (
  <List>
    {props.rows.length <= 1 && (
      <>
        <ToolbarItem
          name="State"
          leftIcon="list_alt"
          rightIcon="navigate_next"
          selected={props.view === "statePage"}
          onClick={() => props.handleViewClick("statePage")}
        />
        <ToolbarItem
          name="History"
          leftIcon="history"
          rightIcon="navigate_next"
          selected={props.view === "history"}
          onClick={() => props.handleViewClick("history")}
        />
        <ToolbarItem
          name="PSTools"
          leftIcon="code"
          rightIcon="navigate_next"
          selected={props.view === "psTools"}
          onClick={() => props.handleViewClick("psTools")}
        />
        <ToolbarItem
          name="VNC"
          leftIcon="picture_in_picture"
          rightIcon="navigate_next"
          selected={props.view === "vnc"}
          onClick={() => props.handleViewClick("vnc")}
        />
        <Divider style={{ marginTop: "8px", marginBottom: "8px" }} />
        <ToolbarItem
          name="Shared Drives"
          leftIcon="folder"
          rightIcon="get_app"
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
      leftIcon="settings"
      onClick={() => props.openLogLevel()}
    />
    <ToolbarItem
      name="Delete Logs"
      leftIcon="delete_sweep"
      onClick={() => sendDeviceAction(props.rows, "deleteLogs")}
    />
    <ToolbarItem
      name="Clean Start"
      leftIcon="power_settings_new"
      onClick={() => sendDeviceAction(props.rows, "cleanStart")}
    />
    <ToolbarItem
      name="RAM Clear"
      leftIcon="memory"
      onClick={(): void => sendDeviceAction(props.rows, "ramClear")}
    />
    <ToolbarItem
      name="Reset Display"
      leftIcon="desktop_windows"
      onClick={() => sendDeviceAction(props.rows, "resetDisplay")}
    />
    <Divider style={{ marginTop: "8px", marginBottom: "8px" }} />
    <ToolbarItem
      name="Force Refresh"
      leftIcon="refresh"
      onClick={() => sendRefreshDevice(props.rows)}
    />
    <ToolbarItem
      name="Clear Record"
      leftIcon="delete"
      onClick={() => sendClearDevice(props.rows)}
    />
  </List>
);

export default Toolbar;
