import React, { Component } from "react";
import { ListItem, ListItemIcon, ListItemText } from "material-ui/List";
import Icon from "material-ui/Icon";

class ToolbarItem extends Component {
  render() {
    return (
      <div
        style={
          this.props.selected
            ? { backgroundColor: "rgba(0, 0, 0, 0.04)" }
            : null
        }
      >
        <ListItem button onClick={this.props.onClick}>
          <ListItemIcon>
            <Icon style={{ marginRight: "0px" }}>{this.props.icon}</Icon>
          </ListItemIcon>
          <ListItemText
            primary={this.props.name}
            disableTypography={true}
            style={{ color: "rgba(0, 0, 0, 0.54)" }}
          />
          {this.props.chevron && (
            <ListItemIcon>
              <Icon style={{ marginRight: "0px" }}>navigate_next</Icon>
            </ListItemIcon>
          )}
        </ListItem>
      </div>
    );
  }
}

export default ToolbarItem;