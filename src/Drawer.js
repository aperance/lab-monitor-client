import React, { Component } from "react";
import { connect } from "react-redux";
import Toolbar from "./Toolbar";
import History from "./History";
import HistoryDetails from "./HistoryDetails";
import WebPage from "./WebPage";

const widths = [200, 600, 400];
const offsets = [
  [-widths[0], -widths[0] - widths[1], -widths[0] - widths[1] - widths[2]],
  [0, -widths[1], -widths[1] - widths[2]],
  [widths[1], 0, -widths[2]],
  [widths[1] + widths[2], widths[2], 0]
];
const baseStyles = {
  height: "calc(100% - 64px)",
  top: "64px",
  position: "fixed",
  zIndex: "1",
  overflowX: "hidden",
  transition: ".5s",
  paddingTop: "0px",
  boxShadow:
    "-2px 0px 4px -1px rgba(0, 0, 0, 0.2), -4px 0px 5px 0px rgba(0, 0, 0, 0.14), -1px 0px 10px 0px rgba(0, 0, 0, 0.12)",
  backgroundColor: "rgba(255, 255, 255, 1)"
};

class DrawerContainer extends Component {
  render() {
    const viewLookup = {
      history: <History />,
      logsPage: <WebPage target={this.props.rows[0] + this.props.logsPath} />,
      statePage: <WebPage target={this.props.rows[0] + this.props.statePath} />
    };
    let drawerContents = [
      this.props.rows[0] ? <Toolbar /> : null,
      this.props.view ? viewLookup[this.props.view] : null,
      this.props.history.property ? (
        <HistoryDetails id={this.props.rows[0]} history={this.props.history} />
      ) : null
    ];

    return (
      <div>
        {drawerContents.map((child, index) => {
          return (
            <div
              key={index}
              style={{
                ...baseStyles,
                right:
                  offsets[drawerContents.filter(x => x).length][index] + "px",
                width: widths[index] + "px"
              }}
            >
              {child}
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    view: state.selected.view,
    rows: state.selected.rows,
    history: state.selected.history,
    statePath: state.configuration.statePath,
    logsPath: state.configuration.logsPath
  };
};

export default connect(mapStateToProps)(DrawerContainer);
