import React, { Component } from "react";
import List, { ListItem } from "material-ui/List";

class HistoryDetails extends Component {
  render() {
    return (
      <List>
        {this.props.values.map(value => (
          <div>
            <ListItem divider={true} key={value[0]}>
              <div style={{ fontSize: "0.75rem", flex: "1 1 auto" }}>
                <p style={{ margin: "0", minHeight: "14px" }}>{value[1]}</p>
                <p
                  style={{
                    margin: "0",
                    color: "darkgray",
                    fontWeight: "300"
                  }}
                >
                  {value[0]}
                </p>
              </div>
            </ListItem>
          </div>
        ))}
      </List>
    );
  }
}

export default HistoryDetails;
