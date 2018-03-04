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
              icon="laptop_windows"
              chevron={true}
              selected={this.props.view === "psTools"}
              onClick={e => this.props.handleViewClick("psTools")}
            />
          </div>
        )}
        <Divider />
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
          onClick={e =>
            this.props.handleActionClick(this.props.rows, "deleteLogs")
          }
        />
        <ToolbarItem
          name="Clean Start"
          icon="refresh"
          chevron={false}
          onClick={e =>
            this.props.handleActionClick(this.props.rows, "cleanStart")
          }
        />
        <ToolbarItem
          name="RAM Clear"
          icon="memory"
          chevron={false}
          onClick={e =>
            this.props.handleActionClick(this.props.rows, "ramClear")
          }
        />
      </List>
    );
  }
}

export default Toolbar;
