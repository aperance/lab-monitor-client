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
    this.state = { subViewWidth: 600, isDragging: false };
  }

  changeWidth(e) {
    if (this.state.isDragging) {
      this.setState({
        subViewWidth: Math.max(window.innerWidth - e.pageX, 400)
      });
    }
  }

  render() {
    return (
      <div
        onMouseUp={() => this.setState({ isDragging: false })}
        onMouseLeave={() => this.setState({ isDragging: false })}
        onMouseMove={e => this.changeWidth(e)}
      >
        <Drawers
          subViewWidth={this.state.subViewWidth}
          drawersVisible={this.props.drawersVisible}
          isDragging={this.state.isDragging}
          startDrag={() => this.setState({ isDragging: true })}
        >
          <ToolbarContainer />
          {viewLookup[this.props.subView]}
        </Drawers>
      </div>
    );
  }
}

export default connect(mapStateToProps)(DrawerContainer);
