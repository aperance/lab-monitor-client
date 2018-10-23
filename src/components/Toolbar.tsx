import * as React from "react";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ToolbarItem from "./ToolbarItem";
import { sendDeviceAction, sendRefreshDevice } from "../messageHandler";

interface Props {
  view: string | null;
  rows: string[];
  logsUrl?: string;
  fileContents?: string;
  handleViewClick: (view: string) => null;
  openLogLevel: () => void;
}

class Toolbar extends React.Component<Props> {
  public render() {
    return (
      <List>
        {this.props.rows.length === 1 && (
          <>
            <ToolbarItem
              name="State"
              leftIcon="toc"
              rightIcon="navigate_next"
              selected={this.props.view === "statePage"}
              onClick={() => this.props.handleViewClick("statePage")}
            />
            <ToolbarItem
              name="History"
              leftIcon="history"
              rightIcon="navigate_next"
              selected={this.props.view === "history"}
              onClick={() => this.props.handleViewClick("history")}
            />
            <ToolbarItem
              name="PSTools"
              leftIcon="code"
              rightIcon="navigate_next"
              selected={this.props.view === "psTools"}
              onClick={() => this.props.handleViewClick("psTools")}
            />
            <ToolbarItem
              name="VNC"
              leftIcon="picture_in_picture"
              rightIcon="navigate_next"
              selected={this.props.view === "vnc"}
              onClick={() => this.props.handleViewClick("vnc")}
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
                  this.props.fileContents &&
                  URL.createObjectURL(
                    new Blob([this.props.fileContents], { type: "text/plain" })
                  )
                }
                target="_blank"
                download="test.bat"
              />
            </ToolbarItem>
            <Divider style={{ marginTop: "8px", marginBottom: "8px" }} />
            <ToolbarItem
              name="Logs"
              leftIcon="description"
              rightIcon="open_in_new"
              onClick={() => {
                const link = document.getElementById("logsLink");
                if (link !== null) link.click();
              }}
            >
              <a id="logsLink" href={this.props.logsUrl} target="_blank" />
            </ToolbarItem>
            <Divider style={{ marginTop: "8px", marginBottom: "8px" }} />
          </>
        )}

        <ToolbarItem
          name="Log Level"
          leftIcon="settings"
          onClick={() => this.props.openLogLevel()}
        />
        <ToolbarItem
          name="Delete Logs"
          leftIcon="delete"
          onClick={() => sendDeviceAction(this.props.rows, "deleteLogs")}
        />
        <ToolbarItem
          name="Clean Start"
          leftIcon="refresh"
          onClick={() => sendDeviceAction(this.props.rows, "cleanStart")}
        />
        <ToolbarItem
          name="RAM Clear"
          leftIcon="memory"
          onClick={(): void => sendDeviceAction(this.props.rows, "ramClear")}
        />
        <ToolbarItem
          name="Reset Display"
          leftIcon="desktop_windows"
          onClick={() => sendDeviceAction(this.props.rows, "resetDisplay")}
        />
        <Divider style={{ marginTop: "8px", marginBottom: "8px" }} />
        <ToolbarItem
          name="Force Refresh"
          leftIcon="refresh"
          onClick={() => sendRefreshDevice(this.props.rows)}
        />
      </List>
    );
  }
}

export default Toolbar;
