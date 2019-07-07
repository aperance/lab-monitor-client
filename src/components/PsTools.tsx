import * as React from "react";
import { useState, useContext } from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Input,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Button
} from "@material-ui/core";
import Terminal from "./Terminal";
import { WebsocketContext } from "../websockets/WebsocketContext";
import { psToolsRequest } from "../websockets/messageCreators";
import { ConfigurationContext } from "../configuration/ConfigurationContext";

// @ts-ignore
const useStyles = makeStyles({
  // @ts-ignore
  container: {
    // tslint:disable-next-line:object-literal-key-quotes
    margin: "24px 32px 0px 32px",
    "& form": { display: "flex", flexWrap: "wrap", marginTop: "16px" },
    "& label": { fontSize: "0.825rem", height: "15px" },
    "& button": { margin: "8px 0px 8px" },
    // @ts-ignore
    "& input": { fontSize: ["0.825rem", "!important"], height: "15px" }
  },
  presetsInput: { width: "100%" },
  modeInput: { width: "76px", marginRight: "16px" },
  cmdInput: { width: "calc(100% - 164px)", marginRight: "8px" },
  text: { fontSize: "0.825rem" }
});

interface Props {
  target: string | null;
  result: string | null;
  clearResult: () => void;
}

const PsTools = (props: Props) => {
  const classes = useStyles();
  const ws = useContext(WebsocketContext);
  const presets = useContext(ConfigurationContext).psTools;
  const [preset, setPreset] = useState("");
  const [mode, setMode] = useState("");
  const [cmd, setCmd] = useState("");

  return (
    <>
      {props.target && (
        <div className={classes.container}>
          <form>
            <FormControl className={classes.presetsInput}>
              <InputLabel>Load Preset Command</InputLabel>
              <Select
                className={classes.text}
                input={<Input id="presets" />}
                value={preset}
                onChange={e => {
                  const value = e.target.value as string;
                  setPreset(value);
                  setMode(presets[value].mode);
                  setCmd(presets[value].cmd);
                }}
              >
                {Object.keys(presets).map(x => (
                  <MenuItem className={classes.text} key={x} value={x}>
                    {presets[x].name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </form>

          <form>
            <FormControl className={classes.modeInput}>
              <InputLabel>Mode</InputLabel>
              <Select
                className={classes.text}
                input={<Input id="mode" />}
                value={mode}
                onChange={e => {
                  const value = e.target.value as string;
                  setPreset("");
                  setMode(value);
                }}
              >
                <MenuItem className={classes.text} value="psExec">
                  PSExec
                </MenuItem>
                <MenuItem className={classes.text} value="psKill">
                  PSKill
                </MenuItem>
              </Select>
            </FormControl>

            <FormControl className={classes.cmdInput}>
              <InputLabel htmlFor="name-input">Command</InputLabel>
              <Input
                id="cmd"
                value={cmd}
                onChange={e => {
                  setPreset("");
                  setCmd(e.target.value);
                }}
              />
            </FormControl>

            <Button
              size="small"
              onClick={() => {
                props.clearResult();
                if (props.target)
                  ws.send(psToolsRequest(props.target, mode, cmd));
              }}
            >
              Send
            </Button>
          </form>
          <Terminal output={props.result} />
        </div>
      )}
    </>
  );
};

export default PsTools;
