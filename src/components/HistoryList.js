import React, { Component } from "react";
import List, { ListItem, ListItemText, ListItemIcon } from "material-ui/List";
import Icon from "material-ui/Icon";

class HistoryList extends Component {
  constructor(props) {
    super(props);
    this.state = { properties: this.props.properties.slice(0, 20) };
    setTimeout(() => this.setState({ properties: this.props.properties }), 600);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ properties: nextProps.properties });
  }
  render() {
    return (
      <div>
        <List>
          {this.state.properties.map(property => (
            <ListItem
              button
              onClick={e => this.props.handleClick(property)}
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
