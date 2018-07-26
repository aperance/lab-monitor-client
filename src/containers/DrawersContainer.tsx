import * as React from "react";
import { connect } from "react-redux";
import { StoreState } from "../types";
import Drawers from "../components/Drawers";
import ToolbarContainer from "../containers/ToolbarContainer";
import HistoryContainer from "../containers/HistoryContainer";
import WebPageContainer from "../containers/WebPageContainer";
import PsToolsContainer from "../containers/PsToolsContainer";
import VncContainer from "../containers/VncContainer";

const mapStateToProps = (state: StoreState) => {
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

const viewLookup: { [view: string]: any } = {
  history: <HistoryContainer />,
  logsPage: <WebPageContainer />,
  statePage: <WebPageContainer />,
  psTools: <PsToolsContainer />,
  vnc: <VncContainer />
};

interface Props {
  drawersVisible: number;
  subView: string | null;
}

interface State {
  subViewWidth: number;
  isDragging: boolean;
}

class DrawerContainer extends React.Component<Props, State> {
  public state: State = { subViewWidth: 600, isDragging: false };

  public changeWidth(e: any) {
    if (this.state.isDragging) {
      this.setState({
        subViewWidth: Math.max(window.innerWidth - e.pageX, 400)
      });
    }
  }

  public render() {
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
          {this.props.subView && viewLookup[this.props.subView]}
        </Drawers>
      </div>
    );
  }
}

export default connect(mapStateToProps)(DrawerContainer);
