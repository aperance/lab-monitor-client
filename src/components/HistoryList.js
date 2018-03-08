import React, { Component } from "react";
import { List } from "react-virtualized";
import { ListItem, ListItemText, ListItemIcon } from "material-ui/List";
import { withStyles } from "material-ui/styles";
import Icon from "material-ui/Icon";

const styles = theme => ({
  row: { backgroundColor: "white" },
  selectedRow: { backgroundColor: "rgba(0, 0, 0, 0.04)" },
  text: { fontSize: "0.75rem" },
  icon: { marginRight: "0px" }
});

class HistoryList extends Component {
  render() {
    return (
      <List
        width={600}
        rowHeight={40}
        height={window.innerHeight - 64}
        rowCount={this.props.properties.length}
        rowRenderer={({ key, index, isScrolling, isVisible, style }) => (
          <ListItem
            button
            style={style}
            key={key}
            dense={true}
            divider={true}
            className={
              this.props.properties[index] !== this.props.selectedProperty
                ? this.props.classes.row
                : this.props.classes.selectedRow
            }
            onClick={e => this.props.handleClick(this.props.properties[index])}
          >
            <ListItemText
              classes={{ primary: this.props.classes.text }}
              primary={this.props.properties[index]}
            />
            <ListItemIcon className={this.props.classes.icon}>
              <Icon>navigate_next</Icon>
            </ListItemIcon>
          </ListItem>
        )}
      />
    );
  }
}

export default withStyles(styles)(HistoryList);
