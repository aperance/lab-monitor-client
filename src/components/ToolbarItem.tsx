import * as React from "react";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Icon from "@material-ui/core/Icon";

const styles = createStyles({
  selected: { backgroundColor: "rgba(0, 0, 0, 0.04)" },
  root: {
    paddingLeft: "20px",
    paddingRight: "20px"
  },
  icon: {
    marginRight: "0px",
    "& span": {
      height: "auto",
      width: "auto",
      fontSize: "1.2rem"
    }
  },
  text: {
    fontSize: "0.8rem",
    color: "rgba(0, 0, 0, 0.54)"
  }
});

interface Props extends WithStyles<typeof styles> {
  name: string;
  leftIcon: string;
  rightIcon?: string;
  selected?: boolean;
  onClick: () => void;
  children: JSX.Element;
}

function ToolbarItem(props: Props) {
  return (
    <div className={props.selected ? props.classes.selected : undefined}>
      <ListItem button onClick={props.onClick} className={props.classes.root}>
        <ListItemIcon className={props.classes.icon}>
          <Icon>{props.leftIcon}</Icon>
        </ListItemIcon>
        <ListItemText
          classes={{ primary: props.classes.text }}
          primary={props.name}
        />
        {props.rightIcon && (
          <ListItemIcon className={props.classes.icon}>
            <Icon>{props.rightIcon}</Icon>
          </ListItemIcon>
        )}
      </ListItem>
      {props.children}
    </div>
  );
}

export default withStyles(styles)(ToolbarItem);
