import React, { Component } from "react";
import { connect } from "react-redux";
import Drawers from "../components/Drawers";
import ToolbarContainer from "../containers/ToolbarContainer";
import HistoryListContainer from "../containers/HistoryListContainer";
import WebPageContainer from "../containers/WebPageContainer";
import PsToolsContainer from "../containers/PsToolsContainer";
import VncContainer from "../containers/VncContainer";

const mapStateToProps = state => {
  return {
    drawersVisible:
      state.userSelection.rows[0] === undefined
        ? 0
        : state.userSelection.view === null
          ? 1
          : 2,
    subView: state.userSelection.view
  };
};

const viewLookup = {
  history: <HistoryListContainer />,
  logsPage: <WebPageContainer />,
  statePage: <WebPageContainer />,
  psTools: <PsToolsContainer />,
  vnc: <VncContainer />
};

class DrawerContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { subViewWidth: 600, startX: null };
  }

  changeWidth(currentX) {
    if (this.state.startX) {
      this.setState({
        subViewWidth: Math.max(
          this.state.subViewWidth + this.state.startX - currentX,
          400
        ),
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
        <Drawers
          subViewWidth={this.state.subViewWidth}
          visible={this.props.drawersVisible}
          transition={this.state.startX ? "0s" : ".5s"}
          onClick={e => this.setState({ startX: e.screenX })}
        >
          <ToolbarContainer />
          {viewLookup[this.props.subView]}
        </Drawers>
      </div>
    );
  }
}

export default connect(mapStateToProps)(DrawerContainer);
