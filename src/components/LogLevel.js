import React, { Component } from "react";
import Dialog, { DialogActions, DialogContent } from "material-ui/Dialog";
import Input, { InputLabel } from "material-ui/Input";
import { MenuItem } from "material-ui/Menu";
import { FormControl } from "material-ui/Form";
import Select from "material-ui/Select";
import Button from "material-ui/Button";
import { withStyles } from "material-ui/styles";
import { sendAction } from "../websocket.js";

const styles = theme => ({
  form: { display: "flex", flexWrap: "wrap" },
  selectNamespace: { width: "230px", marginRight: "32px" },
  selectLevel: { width: "90px" }
});

class LogLevel extends Component {
  constructor(props) {
    super(props);
    this.state = { namespace: "", level: "" };
  }

  render() {
    return (
      <Dialog open={this.props.open} onClose={this.props.cancelLogLevel}>
        <DialogContent>
          <form className={this.props.classes.form}>
            <FormControl>
              <InputLabel>Namespace</InputLabel>
              <Select
                className={this.props.classes.selectNamespace}
                value={this.state.namespace}
                onChange={e => this.setState({ namespace: e.target.value })}
                input={<Input id="namespace" />}
              >
                {this.props.namespaces.map(namespace => (
                  <MenuItem key={namespace} value={namespace}>
                    {namespace}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <InputLabel>Level</InputLabel>
              <Select
                className={this.props.classes.selectLevel}
                value={this.state.level}
                onChange={e => this.setState({ level: e.target.value })}
                input={<Input id="level" />}
              >
                {this.props.levels.map(level => (
                  <MenuItem key={level} value={level}>
                    {level}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </form>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={e => {
              sendAction(this.props.targets, "logLevel", this.state);
              this.props.cancelLogLevel();
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

export default withStyles(styles)(LogLevel);
