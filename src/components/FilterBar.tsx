import React from "react";
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Switch,
  makeStyles,
  Checkbox
} from "@material-ui/core";

import config from "../configuration";
import { useSelector, useDispatch } from "../redux/store";
import { proxyToggle } from "../redux/actionCreators";

type Props = {
  selectedFilters: { [property: string]: string[] };
  setFilters: (x: { property: string; regex: string }) => void;
};

/** CSS-in-JS styling */
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
 * Sidebar for device table containing filtering options for the user.
 * Also contains http proxy enable switch with redux binding.
 * Filter state maintained by parent component.
 */
const FilterBar = (props: Props): JSX.Element => {
  /** Generated CSS class names */
  const classes = useStyles();
  const isProxyEnabled = useSelector((state) => state.userSelection.proxy);
  const dispatch = useDispatch();

  return (
    <FormControl className={classes.root}>
      {config.filters.map(({ property, title, options }) => {
        return (
          <div key={property}>
            <FormLabel className={classes.formLabel} focused={false}>
              {title}
            </FormLabel>
            <FormGroup className={classes.formGroup}>
              {Object.entries(options).map(([label, regex]) => {
                return (
                  <FormControlLabel
                    className={classes.formControlLabel}
                    classes={{ label: classes.label }}
                    control={
                      <Checkbox
                        className={classes.checkbox}
                        color="primary"
                        checked={props.selectedFilters[property]?.includes(
                          regex
                        )}
                        onClick={() => props.setFilters({ property, regex })}
                      />
                    }
                    label={label}
                  />
                );
              })}
            </FormGroup>
          </div>
        );
      })}
      {
        /** HTTP Proxy Option */
        process.env.DEMO !== "true" && (
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
        )
      }
    </FormControl>
  );
};

export default React.memo(
  FilterBar,
  (prev, next) => prev.selectedFilters === next.selectedFilters
);
