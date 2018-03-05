import React, { Component } from "react";
import { List } from "react-virtualized";
import { ListItem, ListItemText, ListItemIcon } from "material-ui/List";
import Icon from "material-ui/Icon";

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
            key={key}
            button
            dense={true}
            divider={true}
            style={{
              ...style,
              backgroundColor:
                this.props.properties[index] === this.props.selectedProperty
                  ? "rgba(0, 0, 0, 0.04)"
                  : "white"
            }}
            onClick={e => this.props.handleClick(this.props.properties[index])}
          >
            <ListItemText
              disableTypography={true}
              style={{ fontSize: "0.75rem" }}
              primary={this.props.properties[index]}
            />
            <ListItemIcon>
              <Icon style={{ marginRight: "0px" }}>navigate_next</Icon>
            </ListItemIcon>
          </ListItem>
        )}
      />
    );
  }
}

export default HistoryList;
