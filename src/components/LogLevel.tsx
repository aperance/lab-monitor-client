import * as React from "react";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import { sendDeviceAction } from "../messageHandler";

const styles = createStyles({
  form: { display: "flex", flexWrap: "wrap" },
  selectNamespace: { width: "230px", marginRight: "32px" },
  selectLevel: { width: "90px" }
});

interface Props extends WithStyles<typeof styles> {
  open: boolean;
  namespaces: string[];
  levels: string[];
  targets: string[];
  cancelLogLevel: () => void;
}

interface State {
  namespace: string;
  level: string;
}

class LogLevel extends React.Component<Props, State> {
  public state: State = { namespace: "", level: "" };

  public render() {
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
            onClick={() => {
              sendDeviceAction(this.props.targets, "logLevel", this.state);
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
