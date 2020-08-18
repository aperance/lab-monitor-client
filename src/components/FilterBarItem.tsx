import React from "react";
import {FormControlLabel, makeStyles} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";

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
    // tslint:disable-next-line:object-literal-key-quotes
    fontSize: "1.0rem",
    // tslint:disable-next-line:object-literal-key-quotes
    width: "24px",
    // tslint:disable-next-line:object-literal-key-quotes
    height: "18px",
    // tslint:disable-next-line:object-literal-key-quotes
    padding: "0px"
  }
});

interface Props {
  selectedFilters: {[property: string]: string[]};
  property: string;
  regex: string;
  label: string;
  handleCheckboxClick: (property: string, regex: string) => void;
}

const FilterBarItem = (props: Props) => {
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
