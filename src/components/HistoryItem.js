import React, { Component } from "react";
import { Collection, List, AutoSizer } from "react-virtualized";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { withStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";

const styles = theme => ({
  row: {
    backgroundColor: "white"
  },
  selectedRow: {
    backgroundColor: "rgba(0, 0, 0, 0.04)"
  },
  text: { fontSize: "0.75rem" },
  icon: { marginRight: "0px" }
});

class HistoryItem extends Component {
  render() {
    return (
      <ListItem
        button
        style={this.props.style}
        dense={true}
        divider={true}
        className={
          this.props.selected
            ? this.props.classes.selectedRow
            : this.props.classes.row
        }
        onClick={e => this.props.handleClick(this.props.property)}
      >
        <ListItemText
          classes={{ primary: this.props.classes.text }}
          primary={this.props.property}
        />
        <ListItemIcon className={this.props.classes.icon}>
          <Icon>navigate_next</Icon>
        </ListItemIcon>
      </ListItem>
    );
  }
}

export default withStyles(styles)(HistoryItem);
