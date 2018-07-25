import * as React from "react";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const styles = createStyles({
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

interface Props extends WithStyles<typeof styles> {
  selectedFilters: { [property: string]: string[] };
  property: string;
  regex: string;
  label: string;
  handleCheckboxClick: (property: string, regex: string) => void;
}

class FilterBarItem extends React.Component<Props> {
  public render() {
    return (
      <FormControlLabel
        className={this.props.classes.formControlLabel}
        classes={{ label: this.props.classes.label }}
        control={
          <Checkbox
            className={this.props.classes.checkbox}
            color="primary"
            checked={
              this.props.selectedFilters.hasOwnProperty(this.props.property) &&
              this.props.selectedFilters[this.props.property].includes(
                this.props.regex
              )
            }
            onClick={() =>
              this.props.handleCheckboxClick(
                this.props.property,
                this.props.regex
              )
            }
          />
        }
        label={this.props.label}
      />
    );
  }
}

export default withStyles(styles)(FilterBarItem);
