/**
 *
 * @packageDocumentation
 */

import React, {useContext} from "react";
import {useDispatch} from "react-redux";
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Switch,
  makeStyles
} from "@material-ui/core";

import {useSelector} from "../hooks/useSelector";
import {proxyToggle} from "../redux/actionCreators";
import {ConfigurationContext} from "../configuration/ConfigurationContext";
import FilterBarItem from "./FilterBarItem";

type Props = {
  selectedFilters: {[property: string]: string[]};
  handleCheckboxClick: (property: string, regex: string) => void;
};

/**
 * CSS-in-JS styling.
 * @hidden
 */
const useStyles = makeStyles({
  root: {
    padding: "16px",
    margin: "12px 0px",
    borderRight: "1px solid #0000001f",
    position: "static",
    userSelect: "none",
    minWidth: "100px"
  },
  formLabel: {
    fontSize: "0.825rem",
    margin: "0px 8px 8px",
    fontWeight: 500,
    color: "rgba(0, 0, 0, 0.7)"
  },
  formGroup: {
    margin: "4px 8px 16px 8px"
  },
  switchForm: {
    transform: "scale(0.75)",
    margin: 0,
    position: "absolute",
    bottom: "8px",
    left: "0px"
  },
  switchLabel: {
    color: "rgba(0, 0, 0, 0.54)",
    fontWeight: 400,
    whiteSpace: "nowrap"
  }
});

/**
 *
 */
const FilterBar = (props: Props) => {
  const classes = useStyles();
  const isProxyEnabled = useSelector(state => {
    return state.userSelection.proxy;
  });
  const dispatch = useDispatch();
  const filters = useContext(ConfigurationContext).filters;

  return (
    <FormControl className={classes.root}>
      {filters.map(filter => {
        return (
          <div key={filter.property}>
            <FormLabel className={classes.formLabel} focused={false}>
              {filter.title}
            </FormLabel>
            <FormGroup className={classes.formGroup}>
              {Object.entries(filter.options).map(([label, regex]) => {
                return (
                  <FilterBarItem
                    key={label}
                    label={label}
                    regex={regex}
                    property={filter.property}
                    selectedFilters={props.selectedFilters}
                    handleCheckboxClick={props.handleCheckboxClick}
                  />
                );
              })}
            </FormGroup>
          </div>
        );
      })}
      {process.env.DEMO !== "true" && (
        <FormControlLabel
          classes={{
            root: classes.switchForm,
            label: classes.switchLabel
          }}
          control={
            <Switch
              checked={!isProxyEnabled}
              color="primary"
              disableRipple={true}
              onClick={() => dispatch(proxyToggle())}
            />
          }
          label="Disable Proxy"
          labelPlacement="start"
        />
      )}
    </FormControl>
  );
};

const memoizedFilterBar = React.memo(
  FilterBar,
  (prevProps, nextProps) =>
    prevProps.selectedFilters === nextProps.selectedFilters
);

export default memoizedFilterBar;
