import React, { Component } from "react";
import ToolbarContainer from "../containers/ToolbarContainer";
import HistoryListContainer from "../containers/HistoryListContainer";
import HistoryDetailsContainer from "../containers/HistoryDetailsContainer";
import WebPageContainer from "../containers/WebPageContainer";
import PsToolsContainer from "../containers/PsToolsContainer";
import VncContainer from "../containers/VncContainer";
import { withStyles } from "material-ui/styles";

const styles = theme => ({
  drawer: {
    position: "fixed",
    height: "calc(100% - 64px)",
    top: "64px",
    transition: ".5s",
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

const widths = [175, 800, 400];

class Drawers extends Component {
  render() {
    return this.props.drawerContents.map((child, index) => (
      <div
        key={index}
        className={this.props.classes.drawer}
        style={{
          width: widths[index] + "px",
          right: this.props.offsetCalc(widths)[index] + "px",
          overflowY: "hidden"
        }}
      >
        {viewLookup[child]}
      </div>
    ));
  }
}

export default withStyles(styles)(Drawers);
