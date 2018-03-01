import React, { Component } from "react";
import { connect } from "react-redux";
import List, { ListItem, ListItemText } from "material-ui/List";

class History extends Component {
  render() {
    return (
      <div>
        <List>
          {Object.keys(this.props.data).map(key => (
            <ListItem button divider={true} key={key}>
              <ListItemText
                disableTypography={true}
                style={{ fontSize: "0.75rem" }}
                primary={key}
              />
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

const mapStateToProps = state => {
  switch (state.selected.rows.length) {
    case 1:
      return { data: state.table[state.selected.rows[0]] };
    default:
      return { data: {} };
  }
};

export default connect(mapStateToProps)(History);
