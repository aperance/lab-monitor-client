import React, { Component } from "react";
import { connect } from "react-redux";
import List, { ListItem, ListItemIcon, ListItemText } from "material-ui/List";
import Icon from "material-ui/Icon";
import Divider from "material-ui/Divider";

const iconStyle = { marginRight: "0px" };

class Toolbar extends Component {
  render() {
    return (
      <div>
        <List style={{ color: "rgba(0, 0, 0, 0.54)" }}>
          <ListItem
            button
            onClick={e => this.props.handleClick(e, "statePage")}
          >
            <ListItemIcon>
              <Icon style={iconStyle}>list</Icon>
            </ListItemIcon>
            <ListItemText primary="State" disableTypography={true} />
            <ListItemIcon>
              <Icon style={iconStyle}>navigate_next</Icon>
            </ListItemIcon>
          </ListItem>
          <ListItem button onClick={e => this.props.handleClick(e, "logsPage")}>
            <ListItemIcon>
              <Icon style={iconStyle}>description</Icon>
            </ListItemIcon>
            <ListItemText primary="Logs" disableTypography={true} />
            <ListItemIcon>
              <Icon style={iconStyle}>navigate_next</Icon>
            </ListItemIcon>
          </ListItem>
          <ListItem button onClick={e => this.props.handleClick(e, "history")}>
            <ListItemIcon>
              <Icon style={iconStyle}>history</Icon>
            </ListItemIcon>
            <ListItemText primary="History" disableTypography={true} />
            <ListItemIcon>
              <Icon style={iconStyle}>navigate_next</Icon>
            </ListItemIcon>
          </ListItem>
        </List>
        <Divider />
        <List style={{ color: "rgba(0, 0, 0, 0.54)" }}>
          <ListItem button>
            <ListItemIcon>
              <Icon style={iconStyle}>refresh</Icon>
            </ListItemIcon>
            <ListItemText primary="Clean Start" disableTypography={true} />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Icon style={iconStyle}>memory</Icon>
            </ListItemIcon>
            <ListItemText primary="RAM Clear" disableTypography={true} />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Icon style={iconStyle}>delete</Icon>
            </ListItemIcon>
            <ListItemText primary="Delete Logs" disableTypography={true} />
          </ListItem>
        </List>
        <Divider />
        <List style={{ color: "rgba(0, 0, 0, 0.54)" }}>
          <ListItem button>
            <ListItemIcon>
              <Icon style={iconStyle}>settings</Icon>
            </ListItemIcon>
            <ListItemText primary="Log Levels" disableTypography={true} />
            <ListItemIcon>
              <Icon style={iconStyle}>navigate_next</Icon>
            </ListItemIcon>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Icon style={iconStyle}>laptop_windows</Icon>
            </ListItemIcon>
            <ListItemText primary="PSTools" disableTypography={true} />
            <ListItemIcon>
              <Icon style={iconStyle}>navigate_next</Icon>
            </ListItemIcon>
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
