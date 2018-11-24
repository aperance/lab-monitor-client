import * as React from "react";
// @ts-ignore
import { makeStyles } from "@material-ui/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import FilterBarItem from "./FilterBarItem";

const useStyles = makeStyles({
  root: {
    padding: "20px 20px 20px 16px",
    marginTop: "8px",
    marginBottom: "8px",
    borderRight: "1px solid #0000001f",
    position: "static",
    userSelect: "none"
  },
  formLabel: {
    fontSize: "0.75rem",
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

interface Filter {
  property: string;
  title: string;
  options: {
    [label: string]: string;
  };
}

interface Props {
  filters: Filter[];
  selectedFilters: { [property: string]: string[] };
  proxyEnabled: boolean;
  handleCheckboxClick: (property: string, regex: string) => void;
  handleProxyClick: () => void;
}

function FilterBar(props: Props) {
  const classes = useStyles();

  return (
    <FormControl className={classes.root}>
      {props.filters.map(filter => {
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
      <FormControlLabel
        classes={{
          root: classes.switchForm,
          label: classes.switchLabel
        }}
        control={
          <Switch
            checked={!props.proxyEnabled}
            color="primary"
            disableRipple={true}
            onClick={props.handleProxyClick}
          />
        }
        label="Disable Proxy"
        labelPlacement="start"
      />
    </FormControl>
  );
}

export default FilterBar;
