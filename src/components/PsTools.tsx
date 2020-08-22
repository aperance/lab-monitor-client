/**
 *
 * @packageDocumentation
 */

import React, {useState, useContext} from "react";
import {
  Input,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Button,
  makeStyles
} from "@material-ui/core";

import config from "../configuration/configuration";
import {WebsocketContext} from "../websockets/WebsocketContext";
import {psToolsRequest} from "../websockets/messageCreators";
import {useSelector, useDispatch} from "../redux/store";
import {psToolsResponseClear} from "../redux/actionCreators";
import Terminal from "./Terminal";

/**
 * CSS-in-JS styling.
 * @hidden
 */
const useStyles = makeStyles({
  container: {
    margin: "24px 32px 0px 32px",
    "& form": {display: "flex", flexWrap: "wrap", marginTop: "16px"},
    "& label": {fontSize: "0.825rem", height: "15px"},
    "& button": {margin: "8px 0px 8px"},
    "& input": {fontSize: ["0.825rem", "!important"], height: "15px"}
  },
  presetsInput: {width: "100%"},
  modeInput: {width: "76px", marginRight: "16px"},
  cmdInput: {width: "calc(100% - 164px)", marginRight: "8px"},
  text: {fontSize: "0.825rem"}
});

const PsTools = (): JSX.Element => {
  const classes = useStyles();
  /** IP Address of target device. */
  const ipAddress = useSelector(state => state.userSelection.rows[0] ?? null);
  const result = useSelector(state => state.deviceResponse.psTools);
  const dispatch = useDispatch();
  const ws = useContext(WebsocketContext);
  const [preset, setPreset] = useState("");
  const [mode, setMode] = useState("");
  const [cmd, setCmd] = useState("");

  const presets = config.psTools;

  return (
    <>
      {ipAddress && (
        <div className={classes.container}>
          {presets && (
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
          )}

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
                dispatch(psToolsResponseClear());
                if (ipAddress) ws.send(psToolsRequest(ipAddress, mode, cmd));
              }}
            >
              Send
            </Button>
          </form>
          <Terminal output={result} />
        </div>
      )}
    </>
  );
};

export default PsTools;
