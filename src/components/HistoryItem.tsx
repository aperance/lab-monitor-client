import * as React from "react";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
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
  },
  table: { marginTop: "12px" },
  row: {
    fontSize: "0.75rem",
    color: "rgba(0, 0, 0, 0.54)",
    height: "24px",
    display: "flex"
  },
  cell: {
    borderBottom: "none",
    padding: "4px 24px",
    whiteSpace: "nowrap"
  }
});

interface Props extends WithStyles<typeof styles> {
  style: any;
  isSelected: boolean;
  property: string;
  historyData: Array<[string, string | null]> | null;
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
            style={
              this.props.isSelected ? { transform: "rotate(0.5turn)" } : {}
            }
          >
            expand_more
          </Icon>
        </div>
        {this.props.isSelected && (
          <div>
            {this.props.historyData && (
              <Table className={this.props.classes.table}>
                {this.props.historyData.map(([key, value]) => (
                  <TableRow classes={{ root: this.props.classes.row }}>
                    <TableCell
                      className={this.props.classes.cell}
                      style={{ flexGrow: 0 }}
                    >
                      {key}
                    </TableCell>
                    <TableCell
                      className={this.props.classes.cell}
                      style={{ flexGrow: 1 }}
                    >
                      {value}
                    </TableCell>
                  </TableRow>
                ))}
              </Table>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(HistoryItem);
