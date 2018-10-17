import * as React from "react";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import FilterBarItem from "./FilterBarItem";

const styles = createStyles({
  root: {
    padding: "20px 12px 20px 12px",
    height: "calc(100% - 40px)"
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

interface Props extends WithStyles<typeof styles> {
  filters: Filter[];
  selectedFilters: { [property: string]: string[] };
  handleCheckboxClick: (property: string, regex: string) => void;
}

class FilterBar extends React.Component<Props> {
  public render() {
    return (
      <FormControl className={this.props.classes.root}>
        {this.props.filters.map(filter => {
          return (
            <div key={filter.property}>
              <FormLabel
                className={this.props.classes.formLabel}
                focused={false}
              >
                {filter.title}
              </FormLabel>
              <FormGroup className={this.props.classes.formGroup}>
                {Object.entries(filter.options).map(([label, regex]) => {
                  return (
                    <FilterBarItem
                      key={label}
                      label={label}
                      regex={regex}
                      property={filter.property}
                      selectedFilters={this.props.selectedFilters}
                      handleCheckboxClick={this.props.handleCheckboxClick}
                    />
                  );
                })}
              </FormGroup>
            </div>
          );
        })}
        <FormControlLabel
          classes={{
            root: this.props.classes.switchForm,
            label: this.props.classes.switchLabel
          }}
          control={
            <Switch checked={true} color="primary" disableRipple={true} />
          }
          label="Disable Proxy"
          labelPlacement="start"
        />
      </FormControl>
    );
  }
}

export default withStyles(styles)(FilterBar);
