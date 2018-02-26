import React, { Component } from "react";
import { connect } from "react-redux";
import List, { ListItem, ListItemText } from "material-ui/List";

class DetailsList extends Component {
  render() {
    return (
      <div style={{ paddingTop: "64px" }}>
        <List>
          {Object.entries(this.props.data).map(([key, value]) => (
            <ListItem button divider={true}>
              <ListItemText
                disableTypography={true}
                style={{ fontSize: "0.75rem" }}
                primary={
                  <div>
                    <span>{key}: </span>
                    <span style={{ color: "rgba(0, 0, 0, 0.54)" }}>
                      {value}
                    </span>
                  </div>
                }
              />
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

const mapStateToProps = state => {
  switch (state.selected.length) {
    case 1:
      return { data: state.table[state.selected[0]] };
    default:
      return { data: {} };
  }
};

export default connect(mapStateToProps)(DetailsList);
