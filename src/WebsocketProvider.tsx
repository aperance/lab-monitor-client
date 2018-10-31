import * as React from "react";
// @ts-ignore
import { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { StoreState, WsMessageTypeKeys } from "./types";
import { useWebsocket } from "./hooks/useWebsocket";
import {
  isWsMessage,
  isDeviceDataAll,
  isDeviceDataUpdate,
  isDeviceActionResponse,
  isPsToolsResponse
} from "./typeGuards";
import {
  actionResponseSet,
  configuration,
  deviceDataAll,
  deviceDataUpdate,
  psToolsResponse,
  errorMessageSet
} from "./actions/actionCreators";

export const WebsocketContext = React.createContext({});

interface Props {
  url: string;
  children: JSX.Element;
  inboundMessage: (message: unknown) => void;
}

const WebsocketProvider = (props: Props) => {
  const [status, sendToServer] = useWebsocket(props.url, props.inboundMessage);

  /**
   * Public method to trigger refresh of device tracking by server.
   * @param {string[]} targets
   */
  const sendRefreshDevice = (targets: string[]) => {
    sendToServer({
      type: WsMessageTypeKeys.RefreshDevice,
      payload: { targets }
    });
  };

  /**
   * Public method to trigger removal of device in server records.
   * @param {string[]} targets
   */
  const sendClearDevice = (targets: string[]) => {
    sendToServer({
      type: WsMessageTypeKeys.ClearDevice,
      payload: { targets }
    });
  };

  /**
   * Public method to send action request to device via websocket server.
   * @param {string[]} targets
   * @param {string} action
   * @param {object} parameters
   */
  const sendDeviceAction = (
    targets: string[],
    action: string,
    parameters = {}
  ) => {
    sendToServer({
      type: WsMessageTypeKeys.DeviceAction,
      payload: { targets, type: action, parameters }
    });
  };

  /**
   * Public method to send PsTools command to device via websocket server.
   * @param {string} target
   * @param {string} mode
   * @param {string} cmd
   */
  const sendPsToolsCommand = (
    target: string,
    { mode, cmd }: { mode: string; cmd: string }
  ) => {
    sendToServer({
      type: WsMessageTypeKeys.PsToolsCommand,
      payload: { target, mode, argument: cmd }
    });
  };

  return (
    <WebsocketContext.Provider
      value={{
        status,
        sendRefreshDevice,
        sendClearDevice,
        sendDeviceAction,
        sendPsToolsCommand
      }}
    >
      {props.children}
    </WebsocketContext.Provider>
  );
};

const mapStateToProps = (state: StoreState) => {
  return {
    dataReceived:
      Object.keys(state.configuration).length !== 0 &&
      Object.keys(state.tableData).length !== 0
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    inboundMessage: (message: unknown) => {
      console.log(message);
      if (!isWsMessage(message)) return;
      const { type, payload } = message;
      switch (type) {
        case WsMessageTypeKeys.Configuration:
          dispatch(configuration(payload));
          break;
        case WsMessageTypeKeys.DeviceDataAll:
          if (isDeviceDataAll(payload)) dispatch(deviceDataAll(payload));
          break;
        case WsMessageTypeKeys.DeviceDataUpdate:
          if (isDeviceDataUpdate(payload)) dispatch(deviceDataUpdate(payload));
          break;
        case WsMessageTypeKeys.DeviceActionResponse:
          if (isDeviceActionResponse(payload))
            dispatch(actionResponseSet(payload));
          break;
        case WsMessageTypeKeys.PsToolsCommandResponse:
          if (isPsToolsResponse(payload)) dispatch(psToolsResponse(payload));
          break;
        default:
          dispatch(
            errorMessageSet({
              err: new Error("Invalid WS message type specified")
            })
          );
          break;
      }
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WebsocketProvider);
