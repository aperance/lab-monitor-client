import * as React from "react";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";
// import { Collection, List, AutoSizer } from "react-virtualized";
// import ListItem from "@material-ui/core/ListItem";
// import ListItemText from "@material-ui/core/ListItemText";
// import ListItemIcon from "@material-ui/core/ListItemIcon";
import Icon from "@material-ui/core/Icon";

const styles = createStyles({
  root: {
    backgroundColor: "white",
    borderTop: "1px solid #0000001f",
    marginRight: "15px",
    marginLeft: "15px",
    paddingRight: "10px",
    paddingLeft: "10px",
    transitionProperty: "top, height",
    transitionDuration: "0.4s",
    color: "rgba(0, 0, 0, 0.8)"
  },
  topRow: {
    display: "flex",
    justifyContent: "space-between"
  },
  title: {
    fontSize: "0.8rem",
    lineHeight: "40px"
  },
  icon: {
    lineHeight: "40px",
    height: "40px",
    fontSize: "1.25rem",
    transitionProperty: "transform",
    transitionDuration: "0.4s"
  }
});

interface Props extends WithStyles<typeof styles> {
  style: any;
  selected: boolean;
  property: string;
  handleClick: (property: string) => void;
}

class HistoryItem extends React.Component<Props> {
  public render() {
    return (
      <div
        style={this.props.style}
        className={this.props.classes.root}
        onClick={() => this.props.handleClick(this.props.property)}
      >
        <div className={this.props.classes.topRow}>
          <span className={this.props.classes.title}>
            {this.props.property}
          </span>
          <Icon
            className={this.props.classes.icon}
            style={this.props.selected ? { transform: "rotate(0.5turn)" } : {}}
          >
            expand_more
          </Icon>
        </div>
        {this.props.selected && (
          <div style={{ backgroundColor: "red", height: "100%" }}> </div>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(HistoryItem);
