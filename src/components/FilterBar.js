import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FilterBarItem from "./FilterBarItem";

const styles = theme => ({
  drawerPaper: {
    position: "relative",
    zIndex: 0,
    paddingTop: "20px",
    paddingLeft: "8px",
    width: "auto",
    height: "calc(100vh - 80px)"
  },
  formLabel: {
    fontSize: "0.75rem",
    margin: "0px 8px 8px",
    fontWeight: 500,
    color: "rgba(0, 0, 0, 0.7)"
  },
  formGroup: {
    margin: "4px 8px 16px 8px"
  }
});

class FilterBar extends Component {
  render() {
    return (
      <Drawer
        variant="permanent"
        classes={{
          paper: this.props.classes.drawerPaper
        }}
      >
        <FormControl>
          {this.props.filters.map(filter => {
            return (
              <div key={filter.property}>
                <FormLabel
                  className={this.props.classes.formLabel}
                  focused={false}
                >
                  {filter.title}
                </FormLabel>
                <FormGroup className={this.props.classes.formGroup}>
                  {filter.options.map(option => {
                    return (
                      <FilterBarItem
                        key={option}
                        option={option}
                        property={filter.property}
                        selected={this.props.selected}
                        handleCheckboxClick={this.props.handleCheckboxClick}
                      />
                    );
                  })}
                </FormGroup>
              </div>
            );
          })}
        </FormControl>
      </Drawer>
    );
  }
}

export default withStyles(styles)(FilterBar);
