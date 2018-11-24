import * as React from "react";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Icon from "@material-ui/core/Icon";

const styles = createStyles({
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

interface Props extends WithStyles<typeof styles> {
  name: string;
  leftIcon: string;
  rightIcon?: string;
  selectedRows?: string[];
  isSelected?: boolean;
  onClick: () => void;
  children?: JSX.Element;
}

<<<<<<< HEAD
const ToolbarItem = (props: Props) => {
  const classes = useStyles();
=======
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
>>>>>>> parent of d52762c... Migrated to material-ui/styles with hooks
  return (
    <div className={props.isSelected ? props.classes.selected : undefined}>
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
};

const memoizedToolbarItem = React.memo(
  ToolbarItem,
  (prevProps: Props, nextProps: Props) => {
    const didIsSelectedChange = prevProps.isSelected !== nextProps.isSelected;
    const didSelectedRowsChange =
      prevProps.selectedRows &&
      nextProps.selectedRows &&
      (prevProps.selectedRows[0] !== nextProps.selectedRows[0] ||
        prevProps.selectedRows.length !== nextProps.selectedRows.length);

    return !didIsSelectedChange && !didSelectedRowsChange;
  }
);

<<<<<<< HEAD
export { memoizedToolbarItem as ToolbarItem };
=======
export default withStyles(styles)(React.memo(ToolbarItem, preventRender));
>>>>>>> parent of d52762c... Migrated to material-ui/styles with hooks
