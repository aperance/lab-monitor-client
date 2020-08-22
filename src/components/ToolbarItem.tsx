/**
 *
 * @packageDocumentation
 */

import React from "react";
import {
  ListItem,
  ListItemText,
  ListItemIcon,
  Icon,
  makeStyles
} from "@material-ui/core";

type Props = {
  name: string;
  leftIcon: string;
  rightIcon?: string;
  selectedRows?: string[];
  isSelected?: boolean;
  onClick: () => void;
  children?: JSX.Element;
};

/** CSS-in-JS styling */
const useStyles = makeStyles({
  selected: {backgroundColor: "rgba(0, 0, 0, 0.04)"},
  root: {
    width: "200px",
    padding: "8px"
  },
  icon: {
    margin: "4px 12px",
    minWidth: "unset",
    "& span": {
      height: "auto",
      width: "auto",
      fontSize: "1.2rem"
    }
  },
  text: {
    margin: "4px 8px",
    fontSize: "0.8rem",
    color: "rgba(0, 0, 0, 0.54)",
    whiteSpace: "nowrap"
  }
});

const ToolbarItem = (props: Props): JSX.Element => {
  /** Generated CSS class names */
  const classes = useStyles();

  return (
    <div className={props.isSelected ? classes.selected : undefined}>
      <ListItem button onClick={props.onClick} className={classes.root}>
        <ListItemIcon className={classes.icon}>
          <Icon>{props.leftIcon}</Icon>
        </ListItemIcon>
        <ListItemText classes={{primary: classes.text}} primary={props.name} />
        {props.rightIcon && (
          <ListItemIcon className={classes.icon}>
            <Icon>{props.rightIcon}</Icon>
          </ListItemIcon>
        )}
      </ListItem>
      {props.children}
    </div>
  );
};

const memoizedToolbarItem = React.memo(ToolbarItem, (prevProps, nextProps) => {
  const didIsSelectedChange = prevProps.isSelected !== nextProps.isSelected;
  const didSelectedRowsChange =
    prevProps.selectedRows &&
    nextProps.selectedRows &&
    (prevProps.selectedRows[0] !== nextProps.selectedRows[0] ||
      prevProps.selectedRows.length !== nextProps.selectedRows.length);

  return !didIsSelectedChange && !didSelectedRowsChange;
});

export default memoizedToolbarItem;
