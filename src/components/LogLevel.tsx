import * as React from "react";
// @ts-ignore
import { useState, useContext } from "react";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";

const styles = createStyles({
  form: { display: "flex", flexWrap: "wrap" },
  selectNamespace: { width: "230px", marginRight: "32px" },
  selectLevel: { width: "90px" }
});

interface Props extends WithStyles<typeof styles> {
  open: boolean;
  namespaces: string[];
  levels: string[];
  sendDeviceCommand: (namespace: string, level: string) => void;
  close: () => void;
}

function preventRender(prevProps: Props, nextProps: Props) {
  return nextProps.open === prevProps.open;
}

function LogLevel(props: Props) {
  const [namespace, setNamespace] = useState("");
  const [level, setLevel] = useState("");

  return (
    <Dialog open={props.open} onClose={props.close}>
      <DialogContent>
        <form className={props.classes.form}>
          <FormControl>
            <InputLabel>Namespace</InputLabel>
            <Select
              className={props.classes.selectNamespace}
              value={namespace}
              onChange={e => setNamespace(e.target.value)}
              input={<Input id="namespace" />}
            >
              {props.namespaces.map(x => (
                <MenuItem key={x} value={x}>
                  {x}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl>
            <InputLabel>Level</InputLabel>
            <Select
              className={props.classes.selectLevel}
              value={level}
              onChange={e => setLevel(e.target.value)}
              input={<Input id="level" />}
            >
              {props.levels.map(x => (
                <MenuItem key={x} value={x}>
                  {x}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </form>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={() => {
            props.sendDeviceCommand(namespace, level);
            props.close();
          }}
          color="primary"
        >
          Send
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default withStyles(styles)(
  // @ts-ignore
  React.memo(LogLevel, preventRender) as JSX.Element
);
