import * as React from "react";
import { useState, useContext } from "react";
// @ts-ignore
import { makeStyles } from "@material-ui/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import Terminal from "./Terminal";
import { WebsocketContext } from "../websockets/WebsocketContext";
import { psToolsCommand } from "../websockets/messageCreators";

const useStyles = makeStyles({
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

interface Props {
  presets: {
    [x: string]: {
      name: string;
      mode: string;
      cmd: string;
    };
  };
  target: string;
  result?: string;
}

function PsTools(props: Props) {
  const classes = useStyles();
  const ws = useContext(WebsocketContext);
  const [preset, setPreset] = useState("");
  const [mode, setMode] = useState("");
  const [cmd, setCmd] = useState("");

  return (
    <div className={classes.container}>
      <form>
        <FormControl className={classes.presetsInput}>
          <InputLabel>Load Preset Command</InputLabel>
          <Select
            className={classes.text}
            input={<Input id="presets" />}
            value={preset}
            onChange={e => {
              setPreset(e.target.value);
              setMode(props.presets[e.target.value].mode);
              setCmd(props.presets[e.target.value].cmd);
            }}
          >
            {Object.keys(props.presets).map(x => (
              <MenuItem className={classes.text} key={x} value={x}>
                {props.presets[x].name}
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
              setPreset("");
              setMode(e.target.value);
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
            ws.send(psToolsCommand(props.target, mode, cmd));
          }}
        >
          Send
        </Button>
      </form>
      <Terminal output={props.result} />
    </div>
  );
}

export default PsTools;
