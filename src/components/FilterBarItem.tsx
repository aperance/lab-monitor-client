/**
 *
 * @packageDocumentation
 */

import React from "react";
import {FormControlLabel, makeStyles} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";

type Props = {
  selectedFilters: {
    [property: string]: string[];
  };
  property: string;
  regex: string;
  label: string;
  setFilters: (x: {property: string; regex: string}) => void;
};

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
const FilterBarItem = (props: Props) => {
  const classes = useStyles();

  const {property, regex, selectedFilters, setFilters} = props;

  return (
    <FormControlLabel
      className={classes.formControlLabel}
      classes={{label: classes.label}}
      control={
        <Checkbox
          className={classes.checkbox}
          color="primary"
          checked={selectedFilters[property]?.includes(regex)}
          onClick={() => setFilters({property, regex})}
        />
      }
      label={props.label}
    />
  );
};

export default FilterBarItem;
