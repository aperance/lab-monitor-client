import React, { Component } from "react";
import List from "material-ui/List";
import Divider from "material-ui/Divider";
import ToolbarItem from "./ToolbarItem.js";

class Toolbar extends Component {
  render() {
    return (
      <List>
        {this.props.rows.length === 1 && (
          <div>
            <ToolbarItem
              name="State"
              icon="list"
              chevron={true}
              selected={this.props.view === "statePage"}
              onClick={e => this.props.handleClick(e, "statePage")}
            />
            <ToolbarItem
              name="Logs"
              icon="description"
              chevron={true}
              selected={this.props.view === "logsPage"}
              onClick={e => this.props.handleClick(e, "logsPage")}
            />
            <ToolbarItem
              name="History"
              icon="history"
              chevron={true}
              selected={this.props.view === "history"}
              onClick={e => this.props.handleClick(e, "history")}
            />
            <Divider />
            <ToolbarItem
              name="PSTools"
              icon="laptop_windows"
              chevron={true}
              selected={this.props.view === "psTools"}
              onClick={e => this.props.handleClick(e, "psTools")}
            />
          </div>
        )}
        <ToolbarItem
          name="Log Level"
          icon="settings"
          chevron={true}
          selected={this.props.view === "logLevel"}
          onClick={e => this.props.handleClick(e, "logLevel")}
        />
        <Divider />
        <ToolbarItem
          name="Delete Logs"
          icon="delete"
          chevron={false}
          onClick={e => this.props.requestAction(this.props.rows, "deleteLogs")}
        />
        <ToolbarItem
          name="Clean Start"
          icon="refresh"
          chevron={false}
          onClick={e => this.props.requestAction(this.props.rows, "cleanStart")}
        />
        <ToolbarItem
          name="RAM Clear"
          icon="memory"
          chevron={false}
          onClick={e => this.props.requestAction(this.props.rows, "ramClear")}
        />
      </List>
    );
  }
}

export default Toolbar;
