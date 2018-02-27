import React, { Component } from "react";
import { connect } from "react-redux";
import List from "material-ui/List";
import Divider from "material-ui/Divider";
import ToolbarItem from "./ToolbarItem.js";

class Toolbar extends Component {
  render() {
    return (
      <div>
        <List>
          <ToolbarItem
            name="State"
            icon="list"
            chevron={true}
            selected={this.props.subView === "statePage"}
            onClick={e => this.props.handleClick(e, "statePage")}
          />
          <ToolbarItem
            name="Logs"
            icon="description"
            chevron={true}
            selected={this.props.subView === "logsPage"}
            onClick={e => this.props.handleClick(e, "logsPage")}
          />
          <ToolbarItem
            name="History"
            icon="history"
            chevron={true}
            selected={this.props.subView === "history"}
            onClick={e => this.props.handleClick(e, "history")}
          />
        </List>
        <Divider />
        <List>
          <ToolbarItem
            name="Log Level"
            icon="settings"
            chevron={true}
            selected={this.props.subView === "logLevel"}
            onClick={e => this.props.handleClick(e, "logLevel")}
          />
          <ToolbarItem
            name="PSTools"
            icon="laptop_windows"
            chevron={true}
            selected={this.props.subView === "psTools"}
            onClick={e => this.props.handleClick(e, "psTools")}
          />
        </List>
        <Divider />
        <List>
          <ToolbarItem
            name="Delete Logs"
            icon="delete"
            chevron={false}
            selected={false}
            onClick={e => this.props.handleClick(e, "")}
          />
          <ToolbarItem
            name="Clean Start"
            icon="refresh"
            chevron={false}
            selected={false}
            onClick={e => this.props.handleClick(e, "")}
          />
          <ToolbarItem
            name="RAM Clear"
            icon="memory"
            chevron={false}
            selected={false}
            onClick={e => this.props.handleClick(e, "")}
          />
        </List>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    subView: state.subView
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleClick: (e, selectedView) => {
      dispatch({
        type: "UPDATE_SUB_VIEW",
        id: selectedView
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
