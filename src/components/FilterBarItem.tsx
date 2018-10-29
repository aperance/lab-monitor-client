import * as React from "react";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const styles = createStyles({
  formControlLabel: {
    marginLeft: "0px",
    marginRight: "0px"
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
    height: "18px",
    padding: "0px"
  }
});

interface Props extends WithStyles<typeof styles> {
  selectedFilters: { [property: string]: string[] };
  property: string;
  regex: string;
  label: string;
  handleCheckboxClick: (property: string, regex: string) => void;
}

function FilterBarItem(props: Props) {
  return (
    <FormControlLabel
      className={props.classes.formControlLabel}
      classes={{ label: props.classes.label }}
      control={
        <Checkbox
          className={props.classes.checkbox}
          color="primary"
          checked={
            props.selectedFilters.hasOwnProperty(props.property) &&
            props.selectedFilters[props.property].includes(props.regex)
          }
          onClick={() => props.handleCheckboxClick(props.property, props.regex)}
        />
      }
      label={props.label}
    />
  );
}

export default withStyles(styles)(FilterBarItem);
