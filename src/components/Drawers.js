import React, { Component } from "react";
import ToolbarContainer from "../containers/ToolbarContainer";
import HistoryListContainer from "../containers/HistoryListContainer";
import HistoryDetailsContainer from "../containers/HistoryDetailsContainer";
import WebPageContainer from "../containers/WebPageContainer";
import PsToolsContainer from "../containers/PsToolsContainer";

const viewLookup = {
  toolbar: <ToolbarContainer />,
  history: <HistoryListContainer />,
  logsPage: <WebPageContainer />,
  statePage: <WebPageContainer />,
  psTools: <PsToolsContainer />,
  historyDetails: <HistoryDetailsContainer />
};

const widths = [200, 600, 400];

class Drawers extends Component {
  render() {
    return this.props.drawerContents.map((child, index) => (
      <div
        key={index}
        style={{
          width: widths[index] + "px",
          right: this.props.offsetCalc(widths)[index] + "px",

          position: "fixed",
          overflowY: index ? "scroll" : "hidden",
          height: "calc(100% - 64px)",
          top: "64px",
          transition: ".5s",
          backgroundColor: "rgba(255, 255, 255, 1)",
          boxShadow:
            "-2px 0px 4px -1px rgba(0, 0, 0, 0.2), -4px 0px 5px 0px rgba(0, 0, 0, 0.14), -1px 0px 10px 0px rgba(0, 0, 0, 0.12)"
        }}
      >
        {viewLookup[child]}
      </div>
    ));
  }
}

export default Drawers;
