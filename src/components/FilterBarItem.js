import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const styles = theme => ({
  formControlLabel: {
    marginLeft: "0px"
  },
  label: {
    fontSize: "0.75rem",
    color: "rgba(0, 0, 0, 0.54)",
    fontWeight: 400
  },
  checkbox: {
    "& svg": {
      width: "0.9rem"
    },
    fontSize: "1.0rem",
    width: "24px",
    height: "18px"
  }
});

class FilterBarItem extends Component {
  render() {
    return (
      <FormControlLabel
        className={this.props.classes.formControlLabel}
        classes={{ label: this.props.classes.label }}
        control={
          <Checkbox
            className={this.props.classes.checkbox}
            color="primary"
            checked={
              this.props.selected.hasOwnProperty(this.props.property) &&
              this.props.selected[this.props.property].includes(
                this.props.option
              )
            }
            onClick={e =>
              this.props.handleCheckboxClick(
                this.props.property,
                this.props.option
              )
            }
          />
        }
        label={this.props.option}
      />
    );
  }
}

export default withStyles(styles)(FilterBarItem);
