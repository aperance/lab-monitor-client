import * as React from "react";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Icon from "@material-ui/core/Icon";

const styles = createStyles({
  selected: { backgroundColor: "rgba(0, 0, 0, 0.04)" },
  icon: {
    marginRight: "0px",
    height: "auto",
    width: "auto",
    fontSize: "1.25rem"
  },
  text: {
    fontSize: "0.9rem",
    color: "rgba(0, 0, 0, 0.54)"
  }
});

interface Props extends WithStyles<typeof styles> {
  name: string;
  icon: string;
  selected?: boolean;
  chevron: boolean;
  onClick: () => void;
}

class ToolbarItem extends React.Component<Props> {
  public render() {
    return (
      <div
        className={
          this.props.selected ? this.props.classes.selected : undefined
        }
      >
        <ListItem button onClick={this.props.onClick}>
          <ListItemIcon className={this.props.classes.icon}>
            <Icon>{this.props.icon}</Icon>
          </ListItemIcon>
          <ListItemText
            classes={{ primary: this.props.classes.text }}
            primary={this.props.name}
          />
          {this.props.chevron && (
            <ListItemIcon className={this.props.classes.icon}>
              <Icon>navigate_next</Icon>
            </ListItemIcon>
          )}
        </ListItem>
      </div>
    );
  }
}

export default withStyles(styles)(ToolbarItem);
