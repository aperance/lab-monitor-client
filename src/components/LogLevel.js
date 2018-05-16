import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import socket from "../websocket.js";

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
              socket.sendDeviceAction(
                this.props.targets,
                "logLevel",
                this.state
              );
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
