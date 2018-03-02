import React, { Component } from "react";
import { connect } from "react-redux";
import List, { ListItem, ListItemText, ListItemIcon } from "material-ui/List";
import Icon from "material-ui/Icon";

class History extends Component {
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

const mapStateToProps = state => {
  return {
    propertyList:
      state.selected.rows.length === 1
        ? state.table[state.selected.rows[0]]
        : {},
    selectedProperty: state.selected.history.property
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleClick: (e, property) => {
      dispatch({
        type: "HISTORY_SELECT",
        property
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(History);
