import React from "react";
import {FormControlLabel, makeStyles} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";

interface FilterBarItemProps {
  selectedFilters: {[property: string]: string[]};
  property: string;
  regex: string;
  label: string;
  handleCheckboxClick: (property: string, regex: string) => void;
}

/**
 * CSS-in-JS styling.
 * @hidden
 */
const useStyles = makeStyles({
  formControlLabel: {
    marginLeft: "0px",
    marginRight: "0px"
  },
  label: {
    fontSize: "0.825rem",
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

/**
 *
 */
const FilterBarItem = (props: FilterBarItemProps) => {
  const classes = useStyles();

  return (
    <FormControlLabel
      className={classes.formControlLabel}
      classes={{label: classes.label}}
      control={
        <Checkbox
          className={classes.checkbox}
          color="primary"
          checked={
            // eslint-disable-next-line no-prototype-builtins
            props.selectedFilters.hasOwnProperty(props.property) &&
            props.selectedFilters[props.property].includes(props.regex)
          }
          onClick={() => props.handleCheckboxClick(props.property, props.regex)}
        />
      }
      label={props.label}
    />
  );
};

export default FilterBarItem;
