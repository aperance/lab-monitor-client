import * as React from "react";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ToolbarItem from "./ToolbarItem";
import socket from "../websocket";

interface Props {
  view: string | null;
  rows: string[];
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
              icon="toc"
              chevron={true}
              selected={this.props.view === "statePage"}
              onClick={() => this.props.handleViewClick("statePage")}
            />
            <ToolbarItem
              name="Logs"
              icon="description"
              chevron={true}
              selected={this.props.view === "logsPage"}
              onClick={() => this.props.handleViewClick("logsPage")}
            />
            <ToolbarItem
              name="History"
              icon="history"
              chevron={true}
              selected={this.props.view === "history"}
              onClick={() => this.props.handleViewClick("history")}
            />
            <ToolbarItem
              name="PSTools"
              icon="code"
              chevron={true}
              selected={this.props.view === "psTools"}
              onClick={() => this.props.handleViewClick("psTools")}
            />
            <ToolbarItem
              name="VNC"
              icon="picture_in_picture"
              chevron={true}
              selected={this.props.view === "vnc"}
              onClick={() => this.props.handleViewClick("vnc")}
            />
            <Divider style={{ marginTop: "8px", marginBottom: "8px" }} />
          </>
        )}

        <ToolbarItem
          name="Log Level"
          icon="settings"
          chevron={false}
          onClick={() => this.props.openLogLevel()}
        />
        <ToolbarItem
          name="Delete Logs"
          icon="delete"
          chevron={false}
          onClick={() => socket.sendDeviceAction(this.props.rows, "deleteLogs")}
        />
        <ToolbarItem
          name="Clean Start"
          icon="refresh"
          chevron={false}
          onClick={() => socket.sendDeviceAction(this.props.rows, "cleanStart")}
        />
        <ToolbarItem
          name="RAM Clear"
          icon="memory"
          chevron={false}
          onClick={(): void =>
            socket.sendDeviceAction(this.props.rows, "ramClear")
          }
        />
        <ToolbarItem
          name="Reset Display"
          icon="desktop_windows"
          chevron={false}
          onClick={() =>
            socket.sendDeviceAction(this.props.rows, "resetDisplay")
          }
        />
        <Divider style={{ marginTop: "8px", marginBottom: "8px" }} />
        <ToolbarItem
          name="Refresh Monitoring"
          icon="refresh"
          chevron={false}
          onClick={() => socket.sendRefreshDevice(this.props.rows)}
        />
      </List>
    );
  }
}

export default Toolbar;
