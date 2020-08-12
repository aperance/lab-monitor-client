import * as React from "react";
import {useState, useContext, useEffect} from "react";
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
import {ConfigurationContext} from "../configuration/ConfigurationContext";

const useStyles = makeStyles({
  form: {display: "flex", flexWrap: "wrap"},
  selectNamespace: {width: "230px", marginRight: "32px"},
  selectLevel: {width: "90px"}
});

interface Props {
  open: boolean;
  sendDeviceCommand: (namespace: string, level: string) => void;
  close: () => void;
}

const LogLevel = (props: Props) => {
  const classes = useStyles();
  const configuration = useContext(ConfigurationContext).logLevel;
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
              className={classes.selectLevel}
              value={level || ""}
              onChange={e => setLevel(e.target.value as string)}
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
