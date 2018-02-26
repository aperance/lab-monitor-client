import React, { Component } from "react";
import { connect } from "react-redux";
import List, { ListItem, ListItemIcon, ListItemText } from "material-ui/List";
import Icon from "material-ui/Icon";

class Toolbar extends Component {
  render() {
    return (
      <div>
        <List style={{ color: "rgba(0, 0, 0, 0.54)" }}>
          <ListItem button onClick={e => this.props.handleClick(e, "details")}>
            <ListItemIcon>
              <Icon style={{ marginRight: "0px" }}>list</Icon>
            </ListItemIcon>
            <ListItemText primary="Details" disableTypography={true} />
          </ListItem>
          <ListItem
            button
            onClick={e => this.props.handleClick(e, "statePage")}
          >
            <ListItemIcon>
              <Icon style={{ marginRight: "0px" }}>code</Icon>
            </ListItemIcon>
            <ListItemText primary="State" disableTypography={true} />
          </ListItem>
          <ListItem button onClick={e => this.props.handleClick(e, "logsPage")}>
            <ListItemIcon>
              <Icon style={{ marginRight: "0px" }}>description</Icon>
            </ListItemIcon>
            <ListItemText primary="Logs" disableTypography={true} />
          </ListItem>
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
