import * as React from "react";
// @ts-ignore
import { makeStyles } from "@material-ui/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Icon from "@material-ui/core/Icon";

const useStyles = makeStyles({
  selected: { backgroundColor: "rgba(0, 0, 0, 0.04)" },
  root: {
    width: "200px",
    paddingLeft: "20px",
    paddingRight: "20px"
  },
  icon: {
    // tslint:disable-next-line:object-literal-key-quotes
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

interface Props {
  name: string;
  leftIcon: string;
  rightIcon?: string;
  selectedRows?: string[];
  isSelected?: boolean;
  onClick: () => void;
  children?: JSX.Element;
}

function preventRender(prevProps: Props, nextProps: Props) {
  const didIsSelectedChange = prevProps.isSelected !== nextProps.isSelected;
  const didSelectedRowsChange =
    prevProps.selectedRows &&
    nextProps.selectedRows &&
    (prevProps.selectedRows[0] !== nextProps.selectedRows[0] ||
      prevProps.selectedRows.length !== nextProps.selectedRows.length);

  return !didIsSelectedChange && !didSelectedRowsChange;
}

function ToolbarItem(props: Props) {
  const classes = useStyles();
  return (
    <div className={props.isSelected ? classes.selected : undefined}>
      <ListItem button onClick={props.onClick} className={classes.root}>
        <ListItemIcon className={classes.icon}>
          <Icon>{props.leftIcon}</Icon>
        </ListItemIcon>
        <ListItemText
          classes={{ primary: classes.text }}
          primary={props.name}
        />
        {props.rightIcon && (
          <ListItemIcon className={classes.icon}>
            <Icon>{props.rightIcon}</Icon>
          </ListItemIcon>
        )}
      </ListItem>
      {props.children}
    </div>
  );
}

export default React.memo(ToolbarItem, preventRender);
