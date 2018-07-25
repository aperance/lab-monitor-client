import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import Terminal from "./Terminal";
import socket from "../websocket.ts";

const styles = theme => ({
  container: {
    margin: "24px 32px 0px 32px",
    "& form": { display: "flex", flexWrap: "wrap", marginTop: "16px" },
    "& label": { fontSize: "0.825rem" },
    "& button": { margin: "8px 0px 8px" },
    "& input": { fontSize: ["0.825rem", "!important"] }
  },
  presetsInput: { width: "100%" },
  modeInput: { width: "76px", marginRight: "16px" },
  cmdInput: { width: "calc(100% - 164px)", marginRight: "8px" },
  text: { fontSize: "0.825rem" }
});

class PsTools extends Component {
  constructor(props) {
    super(props);
    this.state = { preset: "", mode: "", cmd: "" };
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <form>
          <FormControl className={classes.presetsInput}>
            <InputLabel>Load Preset Command</InputLabel>
            <Select
              className={classes.text}
              input={<Input id="presets" />}
              value={this.state.preset}
              onChange={e =>
                this.setState({
                  preset: e.target.value,
                  mode: this.props.presets[e.target.value].mode,
                  cmd: this.props.presets[e.target.value].cmd
                })
              }
            >
              {Object.keys(this.props.presets).map(preset => (
                <MenuItem className={classes.text} key={preset} value={preset}>
                  {this.props.presets[preset].name}
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
              value={this.state.mode}
              onChange={e =>
                this.setState({ mode: e.target.value, preset: "" })
              }
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
              value={this.state.cmd}
              onChange={e => this.setState({ cmd: e.target.value, preset: "" })}
            />
          </FormControl>

          <Button
            size="small"
            onClick={e =>
              socket.sendPsToolsCommand(this.props.target, this.state)
            }
          >
            Send
          </Button>
        </form>
        <Terminal output={this.props.result} />
      </div>
    );
  }
}

export default withStyles(styles)(PsTools);
