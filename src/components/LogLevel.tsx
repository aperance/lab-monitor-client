/**
 *
 * @packageDocumentation
 */

import React, {useState, useEffect} from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Input,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Button,
  makeStyles
} from "@material-ui/core";

import config from "../configuration/configuration";

type Props = {
  open: boolean;
  sendDeviceCommand: (namespace: string, level: string) => void;
  close: () => void;
};

/** CSS-in-JS styling */
const useStyles = makeStyles({
  form: {display: "flex", flexWrap: "wrap"},
  selectNamespace: {width: "230px", marginRight: "32px"},
  selectLevel: {width: "90px"}
});

const LogLevel = (props: Props): JSX.Element => {
  /** Generated CSS class names */
  const classes = useStyles();
  const [namespace, setNamespace] = useState(null as string | null);
  const [level, setLevel] = useState(null as string | null);

  useEffect(() => {
    setNamespace(null);
    setLevel(null);
  }, [props.open]);

  return (
    <Dialog open={props.open} onClose={props.close}>
      <DialogContent>
        <form className={classes.form}>
          <FormControl>
            <InputLabel>Namespace</InputLabel>
            <Select
              className={classes.selectNamespace}
              value={namespace || ""}
              onChange={e => setNamespace(e.target.value as string)}
              input={<Input id="namespace" />}
            >
              {config.logLevel.namespace.map(x => (
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
              value={level || ""}
              onChange={e => setLevel(e.target.value as string)}
              input={<Input id="level" />}
            >
              {config.logLevel.level.map(x => (
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
            if (namespace && level) {
              props.sendDeviceCommand(namespace, level);
              props.close();
            }
          }}
          color="primary"
          disabled={!namespace || !level}
        >
          Send
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(
  LogLevel,
  (prevProps, nextProps) => nextProps.open === prevProps.open
);
