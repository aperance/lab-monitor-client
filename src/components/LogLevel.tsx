import * as React from "react";
import { useState, useContext } from "react";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Input,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Button
} from "@material-ui/core";
import { ConfigurationContext } from "../configuration/ConfigurationContext";

const styles = createStyles({
  form: { display: "flex", flexWrap: "wrap" },
  selectNamespace: { width: "230px", marginRight: "32px" },
  selectLevel: { width: "90px" }
});

interface Props extends WithStyles<typeof styles> {
  open: boolean;
  sendDeviceCommand: (namespace: string, level: string) => void;
  close: () => void;
}

const LogLevel = (props: Props) => {
  const configuration = useContext(ConfigurationContext).logLevel;
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
              {configuration.namespace.map(x => (
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
              {configuration.level.map(x => (
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
  (prevProps, nextProps) => nextProps.open === prevProps.open
);

export default withStyles(styles)(memoizedLogLevel);
