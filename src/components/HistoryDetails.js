import React, { Component } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  container: { flex: "1 1 auto" },
  primaryText: {
    fontSize: "0.75rem",
    margin: "0",
    minHeight: "14px"
  },
  secondaryText: {
    fontSize: "0.75rem",
    fontWeight: "300",
    color: "darkgray",
    margin: "0"
  }
});

class HistoryDetails extends Component {
  render() {
    return (
      <List>
        {this.props.values.map(value => (
          <ListItem divider={true} key={value[0]}>
            <div className={this.props.classes.container}>
              <p className={this.props.classes.primaryText}>{value[1]}</p>
              <p className={this.props.classes.secondaryText}>{value[0]}</p>
            </div>
          </ListItem>
        ))}
      </List>
    );
  }
}

export default withStyles(styles)(HistoryDetails);
