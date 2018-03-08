import React, { Component } from "react";
import { ListItem, ListItemIcon, ListItemText } from "material-ui/List";
import Icon from "material-ui/Icon";
import { withStyles } from "material-ui/styles";

const styles = theme => ({
  selected: { backgroundColor: "rgba(0, 0, 0, 0.04)" },
  icon: {
    marginRight: "0px",
    height: "auto",
    width: "auto",
    fontSize: "1.25rem"
  },
  text: {
    paddingLeft: "12px",
    fontSize: "0.9rem",
    color: "rgba(0, 0, 0, 0.54)"
  }
});

class ToolbarItem extends Component {
  render() {
    return (
      <div className={this.props.selected ? this.props.classes.selected : null}>
        <ListItem button onClick={this.props.onClick}>
          <ListItemIcon className={this.props.classes.icon}>
            <Icon>{this.props.icon}</Icon>
          </ListItemIcon>
          <ListItemText
            classes={{ primary: this.props.classes.text }}
            primary={this.props.name}
          />
          {this.props.chevron && (
            <ListItemIcon className={this.props.classes.icon}>
              <Icon>navigate_next</Icon>
            </ListItemIcon>
          )}
        </ListItem>
      </div>
    );
  }
}

export default withStyles(styles)(ToolbarItem);
