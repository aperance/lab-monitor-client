import React, { Component } from "react";
import Input, { InputLabel } from "material-ui/Input";
import { MenuItem } from "material-ui/Menu";
import { FormControl } from "material-ui/Form";
import Select from "material-ui/Select";
import Button from "material-ui/Button";
import Terminal from "./Terminal";

const fontSize = { fontSize: "0.825rem" };

class PsTools extends Component {
  constructor(props) {
    super(props);
    this.state = { preset: "", mode: "", cmd: "" };
  }

  render() {
    return (
      <div style={{ margin: "24px 32px 0px 32px" }}>
        <form style={{ display: "flex", flexWrap: "wrap", marginTop: "16px" }}>
          <FormControl style={{ width: "100%" }}>
            <InputLabel style={fontSize}>Load Preset Command</InputLabel>
            <Select
              input={<Input id="presets" />}
              style={fontSize}
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
                <MenuItem key={preset} value={preset} style={fontSize}>
                  {this.props.presets[preset].name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </form>

        <form style={{ display: "flex", flexWrap: "wrap", marginTop: "16px" }}>
          <FormControl style={{ width: "76px", marginRight: "16px" }}>
            <InputLabel style={fontSize}>Mode</InputLabel>
            <Select
              input={<Input id="mode" />}
              style={fontSize}
              value={this.state.mode}
              onChange={e =>
                this.setState({ mode: e.target.value, preset: "" })
              }
            >
              <MenuItem value="psExec" style={fontSize}>
                PSExec
              </MenuItem>
              <MenuItem value="psKill" style={fontSize}>
                PSKill
              </MenuItem>
            </Select>
          </FormControl>

          <FormControl
            style={{ width: "calc(100% - 164px)", marginRight: "8px" }}
          >
            <InputLabel htmlFor="name-input" style={fontSize}>
              Command
            </InputLabel>
            <Input
              style={fontSize}
              id="cmd"
              value={this.state.cmd}
              onChange={e => this.setState({ cmd: e.target.value, preset: "" })}
            />
          </FormControl>

          <Button
            size="small"
            onClick={e => this.props.sendCommand(this.props.target, this.state)}
            style={{ margin: "8px 0px 8px" }}
          >
            Send
          </Button>
        </form>
        <Terminal output={this.props.response} />
      </div>
    );
  }
}

export default PsTools;
