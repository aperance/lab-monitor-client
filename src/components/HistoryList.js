import React, { Component } from "react";
import List, { ListItem, ListItemText, ListItemIcon } from "material-ui/List";
import Icon from "material-ui/Icon";

class HistoryList extends Component {
  render() {
    return (
      <div>
        <List>
          {Object.keys(this.props.propertyList).map(property => (
            <ListItem
              button
              onClick={e => this.props.handleClick(e, property)}
              divider={true}
              key={property}
              style={
                property === this.props.selectedProperty
                  ? { backgroundColor: "rgba(0, 0, 0, 0.04)" }
                  : null
              }
            >
              <ListItemText
                disableTypography={true}
                style={{ fontSize: "0.75rem" }}
                primary={property}
              />
              <ListItemIcon>
                <Icon style={{ marginRight: "0px" }}>navigate_next</Icon>
              </ListItemIcon>
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

export default HistoryList;
