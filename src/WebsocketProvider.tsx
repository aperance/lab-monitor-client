import * as React from "react";
// @ts-ignore
import { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { WsMessageTypeKeys, WsMessage } from "./types";
import { useWebsocket } from "./hooks/useWebsocket";
import {
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
  psToolsResponse
} from "./actions/actionCreators";

export const WebsocketContext = React.createContext({});

interface Props {
  url: string;
  children: JSX.Element;
  inboundMessage: (message: WsMessage) => void;
}

const WebsocketProvider = (props: Props) => {
  const [status, sendToServer] = useWebsocket(props.url, props.inboundMessage);

  return (
    <WebsocketContext.Provider value={{ status, sendToServer }}>
      {props.children}
    </WebsocketContext.Provider>
  );
};

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    inboundMessage: ({ type, payload }: WsMessage) => {
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
          throw Error("Invalid WS message type specified");
      }
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WebsocketProvider);
