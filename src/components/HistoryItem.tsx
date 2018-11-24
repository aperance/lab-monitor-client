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

<<<<<<< HEAD
const HistoryItem = (props: Props) => {
  const classes = useStyles();

=======
function HistoryItem(props: Props) {
>>>>>>> parent of d52762c... Migrated to material-ui/styles with hooks
  return (
    <div
      style={props.style}
      className={props.classes.root}
      onClick={() => props.handleClick(props.property)}
    >
      <div className={props.classes.topRow}>
        <span className={props.classes.title}>{props.property}</span>
        <Icon
          className={props.classes.icon}
          style={props.isSelected ? { transform: "rotate(0.5turn)" } : {}}
        >
          expand_more
        </Icon>
      </div>
      {props.isSelected && (
        <div>
          {props.historyData && (
            <Table className={props.classes.table}>
              {props.historyData.map(([key, value]) => (
                <TableRow classes={{ root: props.classes.row }}>
                  <TableCell
                    className={props.classes.cell}
                    style={{ flexGrow: 0 }}
                  >
                    {key}
                  </TableCell>
                  <TableCell
                    className={props.classes.cell}
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
};

<<<<<<< HEAD
export { HistoryItem };
=======
export default withStyles(styles)(HistoryItem);
>>>>>>> parent of d52762c... Migrated to material-ui/styles with hooks
