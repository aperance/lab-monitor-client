import * as React from "react";
import { connect } from "react-redux";
import { StoreState } from "../reducers/index";
import PsTools from "../components/PsTools";
import History from "../components/History";
import VncViewer from "../components/VncViewer";
import WebPage from "../components/WebPage";

const mapStateToProps = (state: StoreState) => {
  return {
    selectedDevice:
      state.userSelection.rows.length === 1
        ? state.userSelection.rows[0]
        : null,
    subView: state.userSelection.view,
    historyData: state.historyData[state.userSelection.rows[0]],
    proxyEnabled: state.userSelection.proxy,
    isDragging: state.userSelection.dragging,
    psToolsResult: state.psTools.result || undefined
  };
};

interface Props {
  selectedDevice: string | null;
  subView: string | null;
  historyData: { [x: string]: Array<[string, string | null]> };
  psToolsResult?: string;
  proxyEnabled: boolean;
  isDragging: boolean;
}

const SubViewContainer = (props: Props) => {
  return (
    <>
      {props.selectedDevice &&
        (() => {
          switch (props.subView) {
            case "history":
              return <History historyData={props.historyData} />;
            case "statePage":
              return (
                <WebPage
                  ipAddress={props.selectedDevice}
                  proxyEnabled={props.proxyEnabled}
                />
              );
            case "psTools":
              return (
                <PsTools
                  result={props.psToolsResult}
                  target={props.selectedDevice}
                />
              );
            case "vnc":
              return (
                <VncViewer
                  ipAddress={props.selectedDevice}
                  suspend={props.isDragging}
                />
              );
            default:
              return null;
          }
        })()}
    </>
  );
};

export default connect(mapStateToProps)(SubViewContainer);
