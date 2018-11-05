/** WebSocket Message Types */

export enum WsMessageTypeKeys {
  Configuration = "CONFIGURATION",
  DeviceDataAll = "DEVICE_DATA_ALL",
  DeviceDataUpdate = "DEVICE_DATA_UPDATE",
  RefreshDevice = "REFRESH_DEVICE",
  ClearDevice = "CLEAR_DEVICE",
  DeviceAction = "DEVICE_ACTION",
  DeviceActionResponse = "DEVICE_ACTION_RESPONSE",
  PsToolsCommand = "PSTOOLS_COMMAND",
  PsToolsCommandResponse = "PSTOOLS_COMMAND_RESPONSE",
  UserDialog = "USER_DIALOG",
  Error = "ERROR"
}

export interface WsMessage {
  readonly type: WsMessageTypeKeys;
  // @ts-ignore
  readonly payload: unknown;
}

export interface DeviceDataAll {
  readonly state: {
    [id: string]: {
      [property: string]: string;
    };
  };
  readonly history: {
    [id: string]: {
      [property: string]: Array<[string, string | null]>;
    };
  };
}

export interface DeviceDataUpdate {
  readonly id: string;
  readonly state: { [property: string]: string | null };
  readonly history: Array<[string, [string, string | null]]>;
}

export interface PsToolsRequest {
  readonly target: string;
  readonly mode: string;
  readonly argument: string;
}

export interface PsToolsResponse {
  readonly err: Error | null;
  readonly result: string | null;
}

export interface DeviceActionRequest {
  readonly targets: string[];
  readonly type: string;
  readonly parameters: any;
}

export interface DeviceActionResponse {
  readonly err: Error | null;
  readonly results: Array<{
    err: Error | null;
    success: boolean;
  }> | null;
}

export interface RefreshDeviceRequest {
  readonly targets: string[];
}

export interface ClearDeviceRequest {
  readonly targets: string[];
}

/** Non-WS Interfaces */

export interface ErrorMessage {
  readonly err: Error | null;
}
