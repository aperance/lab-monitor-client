import React, { Component } from "react";
import Dialog, { DialogActions, DialogContent } from "material-ui/Dialog";
import Input, { InputLabel } from "material-ui/Input";
import { MenuItem } from "material-ui/Menu";
import { FormControl } from "material-ui/Form";
import Select from "material-ui/Select";
import Button from "material-ui/Button";

class LogLevel extends Component {
  constructor(props) {
    super(props);
    this.state = { namespace: "", level: "" };
  }

  render() {
    return (
      <Dialog open={this.props.open} onClose={this.props.cancelLogLevel}>
        <DialogContent>
          <form style={{ display: "flex", flexWrap: "wrap" }}>
            <FormControl>
              <InputLabel>Namespace</InputLabel>
              <Select
                value={this.state.namespace}
                onChange={e => this.setState({ namespace: e.target.value })}
                input={<Input id="namespace" />}
                style={{ width: "230px", marginRight: "32px" }}
              >
                {this.props.namespaces.map(namespace => (
                  <MenuItem value={namespace}>{namespace}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <InputLabel>Level</InputLabel>
              <Select
                value={this.state.level}
                onChange={e => this.setState({ level: e.target.value })}
                input={<Input id="level" />}
                style={{ width: "90px" }}
              >
                {this.props.levels.map(level => (
                  <MenuItem value={level}>{level}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </form>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={e => {
              this.props.sendLogLevel(
                this.props.targets,
                "logLevel",
                this.state
              );
            }}
            color="primary"
          >
            Send
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default LogLevel;
