import React, { Component } from "react";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ToolbarItem from "./ToolbarItem.js";
import socket from "../websocket.js";

class Toolbar extends Component {
  render() {
    return (
      <List>
        {this.props.rows.length === 1 && (
          <>
            <ToolbarItem
              name="State"
              icon="toc"
              chevron={true}
              selected={this.props.view === "statePage"}
              onClick={e => this.props.handleViewClick("statePage")}
            />
            <ToolbarItem
              name="Logs"
              icon="description"
              chevron={true}
              selected={this.props.view === "logsPage"}
              onClick={e => this.props.handleViewClick("logsPage")}
            />
            <ToolbarItem
              name="History"
              icon="history"
              chevron={true}
              selected={this.props.view === "history"}
              onClick={e => this.props.handleViewClick("history")}
            />
            <ToolbarItem
              name="PSTools"
              icon="code"
              chevron={true}
              selected={this.props.view === "psTools"}
              onClick={e => this.props.handleViewClick("psTools")}
            />
            <ToolbarItem
              name="VNC"
              icon="picture_in_picture"
              chevron={true}
              selected={this.props.view === "vnc"}
              onClick={e => this.props.handleViewClick("vnc")}
            />
            <Divider style={{ marginTop: "8px", marginBottom: "8px" }} />
          </>
        )}

        <ToolbarItem
          name="Log Level"
          icon="settings"
          chevron={false}
          onClick={e => this.props.openLogLevel()}
        />
        <ToolbarItem
          name="Delete Logs"
          icon="delete"
          chevron={false}
          onClick={e => socket.sendDeviceAction(this.props.rows, "deleteLogs")}
        />
        <ToolbarItem
          name="Clean Start"
          icon="refresh"
          chevron={false}
          onClick={e => socket.sendDeviceAction(this.props.rows, "cleanStart")}
        />
        <ToolbarItem
          name="RAM Clear"
          icon="memory"
          chevron={false}
          onClick={e => socket.sendDeviceAction(this.props.rows, "ramClear")}
        />
        <ToolbarItem
          name="Reset Display"
          icon="desktop_windows"
          chevron={false}
          onClick={e =>
            socket.sendDeviceAction(this.props.rows, "resetDisplay")
          }
        />
        <Divider style={{ marginTop: "8px", marginBottom: "8px" }} />
        <ToolbarItem
          name="Refresh Monitoring"
          icon="refresh"
          chevron={false}
          onClick={e => socket.sendRefreshDevice(this.props.rows)}
        />
      </List>
    );
  }
}

export default Toolbar;
