import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import Drawer from "material-ui/Drawer";
import { FormLabel, FormControl, FormGroup } from "material-ui/Form";
import FilterBarItem from "./FilterBarItem";

const styles = theme => ({
  drawerPaper: {
    position: "relative",
    zIndex: 0,
    paddingTop: "16px",
    width: "auto",
    height: "calc(100vh - 80px)"
  },
  formLabel: {
    fontSize: "0.75rem",
    margin: "0px 8px 8px",
    fontWeight: 500,
    color: "rgba(0, 0, 0, 0.54)"
  },
  formGroup: {
    margin: "4px 16px 16px 8px"
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
                  classes={{ focused: this.props.classes.formLabel }}
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
                        selected={this.props.selectedFilters}
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
