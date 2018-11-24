import * as React from "react";
import { useState } from "react";
// @ts-ignore
import { makeStyles } from "@material-ui/styles";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  form: { display: "flex", flexWrap: "wrap" },
  selectNamespace: { width: "230px", marginRight: "32px" },
  selectLevel: { width: "90px" }
});

interface Props {
  open: boolean;
  namespaces: string[];
  levels: string[];
  sendDeviceCommand: (namespace: string, level: string) => void;
  close: () => void;
}

const LogLevel = (props: Props) => {
  const classes = useStyles();
  const [namespace, setNamespace] = useState("");
  const [level, setLevel] = useState("");

  return (
    <Dialog open={props.open} onClose={props.close}>
      <DialogContent>
        <form className={classes.form}>
          <FormControl>
            <InputLabel>Namespace</InputLabel>
            <Select
              className={classes.selectNamespace}
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
              className={classes.selectLevel}
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
};

const memoizedLogLevel = React.memo(
  LogLevel,
  (prevProps: Props, nextProps: Props) => {
    return nextProps.open === prevProps.open;
  }
);

export { memoizedLogLevel as LogLevel };
