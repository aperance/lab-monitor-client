import * as React from "react";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ToolbarItem from "./ToolbarItem";
import socket from "../websocket";

interface Props {
  view: string | null;
  rows: string[];
  logsUrl: string;
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
              name="Logs"
              leftIcon="description"
              rightIcon="open_in_new"
              onClick={() => window.open(this.props.logsUrl, "_blank")}
            />
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
          onClick={() => socket.sendDeviceAction(this.props.rows, "deleteLogs")}
        />
        <ToolbarItem
          name="Clean Start"
          leftIcon="refresh"
          onClick={() => socket.sendDeviceAction(this.props.rows, "cleanStart")}
        />
        <ToolbarItem
          name="RAM Clear"
          leftIcon="memory"
          onClick={(): void =>
            socket.sendDeviceAction(this.props.rows, "ramClear")
          }
        />
        <ToolbarItem
          name="Reset Display"
          leftIcon="desktop_windows"
          onClick={() =>
            socket.sendDeviceAction(this.props.rows, "resetDisplay")
          }
        />
        <Divider style={{ marginTop: "8px", marginBottom: "8px" }} />
        <ToolbarItem
          name="Refresh Monitoring"
          leftIcon="refresh"
          onClick={() => socket.sendRefreshDevice(this.props.rows)}
        />
      </List>
    );
  }
}

export default Toolbar;
