/**
 *
 * @packageDocumentation
 */

import React, { useState, useContext } from "react";
import {
  Input,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Button,
  Paper,
  makeStyles
} from "@material-ui/core";

import config from "../configuration";
import { WebsocketContext } from "../WebsocketContext";
import { useSelector, useDispatch } from "../redux/store";
import { psToolsResponseClear } from "../redux/actionCreators";

/**  CSS-in-JS styling */
const useStyles = makeStyles({
  container: {
    margin: "24px 32px 0px 32px",
    "& form": { display: "flex", flexWrap: "wrap", marginTop: "16px" },
    "& label": { fontSize: "0.825rem", height: "15px" },
    "& button": { margin: "8px 0px 8px" },
    "& input": { fontSize: ["0.825rem", "!important"], height: "15px" }
  },
  presetsInput: { width: "100%" },
  modeInput: { width: "76px", marginRight: "16px" },
  cmdInput: { width: "calc(100% - 164px)", marginRight: "8px" },
  text: { fontSize: "0.825rem" },
  paper: {
    height: "500px",
    width: "100%",
    marginTop: "32px",
    backgroundColor: "black",
    color: "white",
    fontSize: "0.825rem",
    "& pre": { padding: "10px 10px 10px 10px", whiteSpace: "pre-wrap" }
  }
});

const PsTools = (): JSX.Element | null => {
  const [preset, setPreset] = useState("");
  const [mode, setMode] = useState("");
  const [cmd, setCmd] = useState("");
  /** Generated CSS class names */
  const classes = useStyles();
  /** Function to send message via Websocket */
  const ws = useContext(WebsocketContext);
  /** IP Address of target device */
  const ipAddress = useSelector((state) => state.userSelection.rows[0] || null);
  /** Output from executed PSTools command  */
  const result = useSelector((state) => state.deviceResponse.psTools);
  const dispatch = useDispatch();

  const presets = config.psTools;

  if (ipAddress === null) return null;

  return (
    <div className={classes.container}>
      {presets && (
        <form>
          <FormControl className={classes.presetsInput}>
            <InputLabel>Load Preset Command</InputLabel>
            <Select
              className={classes.text}
              input={<Input id="presets" />}
              value={preset}
              onChange={(e) => {
                const value = e.target.value as string;
                setPreset(value);
                setMode(presets[value].mode);
                setCmd(presets[value].cmd);
              }}
            >
              {Object.keys(presets).map((x) => (
                <MenuItem className={classes.text} key={x} value={x}>
                  {presets[x].name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </form>
      )}

      <form>
        <FormControl className={classes.modeInput}>
          <InputLabel>Mode</InputLabel>
          <Select
            className={classes.text}
            input={<Input id="mode" />}
            value={mode}
            onChange={(e) => {
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
            onChange={(e) => {
              setPreset("");
              setCmd(e.target.value);
            }}
          />
        </FormControl>

        <Button
          size="small"
          onClick={() => {
            dispatch(psToolsResponseClear());
            if (ipAddress) ws.psToolsRequest(ipAddress, mode, cmd);
          }}
        >
          Send
        </Button>
      </form>
      <Paper className={classes.paper} elevation={8} square={true}>
        {result && <pre>{result}</pre>}
      </Paper>
    </div>
  );
};

export default PsTools;
