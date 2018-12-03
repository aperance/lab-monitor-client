import * as React from "react";
import { useState, useContext } from "react";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";
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
import { psToolsCommand } from "../websockets/messageCreators";
import { ConfigurationContext } from "../configuration/ConfigurationContext";

const styles = createStyles({
  container: {
    // tslint:disable-next-line:object-literal-key-quotes
    margin: "24px 32px 0px 32px",
    "& form": { display: "flex", flexWrap: "wrap", marginTop: "16px" },
    "& label": { fontSize: "0.825rem" },
    "& button": { margin: "8px 0px 8px" },
    // @ts-ignore
    "& input": { fontSize: ["0.825rem", "!important"] }
  },
  presetsInput: { width: "100%" },
  modeInput: { width: "76px", marginRight: "16px" },
  cmdInput: { width: "calc(100% - 164px)", marginRight: "8px" },
  text: { fontSize: "0.825rem" }
});

interface Props extends WithStyles<typeof styles> {
  target: string | null;
  result?: string;
}

const PsTools = (props: Props) => {
  const ws = useContext(WebsocketContext);
  const presets = useContext(ConfigurationContext).psTools;
  const [preset, setPreset] = useState("");
  const [mode, setMode] = useState("");
  const [cmd, setCmd] = useState("");

  return (
    <>
      {props.target && (
        <div className={props.classes.container}>
          <form>
            <FormControl className={props.classes.presetsInput}>
              <InputLabel>Load Preset Command</InputLabel>
              <Select
                className={props.classes.text}
                input={<Input id="presets" />}
                value={preset}
                onChange={e => {
                  setPreset(e.target.value);
                  setMode(presets[e.target.value].mode);
                  setCmd(presets[e.target.value].cmd);
                }}
              >
                {Object.keys(presets).map(x => (
                  <MenuItem className={props.classes.text} key={x} value={x}>
                    {presets[x].name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </form>

          <form>
            <FormControl className={props.classes.modeInput}>
              <InputLabel>Mode</InputLabel>
              <Select
                className={props.classes.text}
                input={<Input id="mode" />}
                value={mode}
                onChange={e => {
                  setPreset("");
                  setMode(e.target.value);
                }}
              >
                <MenuItem className={props.classes.text} value="psExec">
                  PSExec
                </MenuItem>
                <MenuItem className={props.classes.text} value="psKill">
                  PSKill
                </MenuItem>
              </Select>
            </FormControl>

            <FormControl className={props.classes.cmdInput}>
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
                if (props.target)
                  ws.send(psToolsCommand(props.target, mode, cmd));
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

export default withStyles(styles)(PsTools);
