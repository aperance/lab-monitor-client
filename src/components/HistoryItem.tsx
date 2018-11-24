import * as React from "react";
// @ts-ignore
import { makeStyles } from "@material-ui/styles";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Icon from "@material-ui/core/Icon";

const useStyles = makeStyles({
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

interface Props {
  style: any;
  isSelected: boolean;
  property: string;
  historyData: Array<[string, string | null]> | null;
  handleClick: (property: string) => void;
}

const HistoryItem = (props: Props) => {
  const classes = useStyles();

  return (
    <div
      style={props.style}
      className={classes.root}
      onClick={() => props.handleClick(props.property)}
    >
      <div className={classes.topRow}>
        <span className={classes.title}>{props.property}</span>
        <Icon
          className={classes.icon}
          style={props.isSelected ? { transform: "rotate(0.5turn)" } : {}}
        >
          expand_more
        </Icon>
      </div>
      {props.isSelected && (
        <div>
          {props.historyData && (
            <Table className={classes.table}>
              {props.historyData.map(([key, value]) => (
                <TableRow classes={{ root: classes.row }}>
                  <TableCell className={classes.cell} style={{ flexGrow: 0 }}>
                    {key}
                  </TableCell>
                  <TableCell className={classes.cell} style={{ flexGrow: 1 }}>
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

export { HistoryItem };
