import * as React from "react";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

const styles = createStyles({
  paper: {
    height: "500px",
    width: "100%",
    marginTop: "32px",
    backgroundColor: "black",
    color: "white",
    fontSize: "0.825rem"
  },
  pre: { padding: "10px 10px 10px 10px", whiteSpace: "pre-wrap" }
});

interface Props extends WithStyles<typeof styles> {
  output?: string;
}

<<<<<<< HEAD
const Terminal = (props: Props) => {
  const classes = useStyles();
=======
function Terminal(props: Props) {
>>>>>>> parent of d52762c... Migrated to material-ui/styles with hooks
  return (
    <Paper className={props.classes.paper} elevation={8} square={true}>
      <pre className={props.classes.pre}>{props.output}</pre>
    </Paper>
  );
};

<<<<<<< HEAD
export { Terminal };
=======
export default withStyles(styles)(Terminal);
>>>>>>> parent of d52762c... Migrated to material-ui/styles with hooks
