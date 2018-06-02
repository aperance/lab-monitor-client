import React, { Component } from "react";
import ToolbarContainer from "../containers/ToolbarContainer";
import HistoryListContainer from "../containers/HistoryListContainer";
import HistoryDetailsContainer from "../containers/HistoryDetailsContainer";
import WebPageContainer from "../containers/WebPageContainer";
import PsToolsContainer from "../containers/PsToolsContainer";
import VncContainer from "../containers/VncContainer";
import { withStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";

const styles = theme => ({
  drawer: {
    position: "fixed",
    height: "calc(100% - 64px)",
    top: "64px",
    overflowY: "hidden",
    backgroundColor: "rgba(255, 255, 255, 1)",
    boxShadow: [
      "-2px 0px 4px -1px rgba(0, 0, 0, 0.2)",
      "-4px 0px 5px 0px rgba(0, 0, 0, 0.14)",
      "-1px 0px 10px 0px rgba(0, 0, 0, 0.12)"
    ]
  }
});

const viewLookup = {
  toolbar: <ToolbarContainer />,
  history: <HistoryListContainer />,
  logsPage: <WebPageContainer />,
  statePage: <WebPageContainer />,
  psTools: <PsToolsContainer />,
  vnc: <VncContainer />,
  historyDetails: <HistoryDetailsContainer />
};

//const widths = [175, 800, 400];

class Drawers extends Component {
  constructor(props) {
    super(props);
    this.state = { widths: { 0: 175, 1: 600, 2: 400 }, startX: null };
  }

  changeWidth(currentX) {
    if (this.state.startX) {
      this.setState({
        widths: {
          ...this.state.widths,
          1: Math.max(this.state.widths[1] + this.state.startX - currentX, 400)
        },
        startX: Math.min(currentX, window.screen.width - 398)
      });
    }
  }

  render() {
    return (
      <div
        onMouseUp={e => this.setState({ startX: null })}
        onMouseLeave={e => this.setState({ startX: null })}
        onMouseMove={e => this.changeWidth(e.screenX)}
      >
        {this.props.drawerContents.map((child, index) => (
          <div
            key={index}
            className={this.props.classes.drawer}
            style={{
              width: this.state.widths[index] + "px",
              right: this.props.offsetCalc(this.state.widths)[index] + "px",
              transition: this.state.startX ? "0s" : ".5s"
            }}
          >
            {index !== 1 ? (
              viewLookup[child]
            ) : (
              <div style={{ display: "flex", height: "100%" }}>
                <div
                  style={{ color: "rgba(0, 0, 0, 0.54)", alignSelf: "stretch" }}
                  onMouseDown={e => this.setState({ startX: e.screenX })}
                >
                  <Icon>drag_indicator</Icon>
                </div>
                <div style={{ flexGrow: 5 }}>{viewLookup[child]}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }
}

export default withStyles(styles)(Drawers);
