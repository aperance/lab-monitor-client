/* eslint-disable @typescript-eslint/no-explicit-any */
/** WebSocket Message Types */

export enum WsMessageTypeKeys {
  DeviceDataAll = "DEVICE_DATA_ALL",
  DeviceDataUpdate = "DEVICE_DATA_UPDATE",
  RefreshDevice = "REFRESH_DEVICE",
  RefreshDeviceAll = "REFRESH_DEVICE_ALL",
  ClearDevice = "CLEAR_DEVICE",
  ClearDeviceAll = "CLEAR_DEVICE_ALL",
  DeviceAction = "DEVICE_ACTION",
  DeviceActionResponse = "DEVICE_ACTION_RESPONSE",
  PsToolsCommand = "PSTOOLS_COMMAND",
  PsToolsCommandResponse = "PSTOOLS_COMMAND_RESPONSE",
  UserDialog = "USER_DIALOG",
  Error = "ERROR"
}

export interface WsMessage {
  readonly type: WsMessageTypeKeys;
  readonly payload?: unknown;
}

/** Inbound Message Types */

export interface DeviceDataAll {
  readonly state: {
    [id: string]: { [property: string]: string };
  };
  readonly history: {
    [id: string]: { [property: string]: [string, string | null][] };
  };
}

export interface DeviceDataUpdate {
  readonly id: string;
  readonly state: { [property: string]: string | null } | null;
  readonly history: Array<[string, [string, string | null]]> | null;
}

export interface PsToolsResponse {
  readonly err: Error | null;
  readonly result: string | null;
}

export interface CommandResponse {
  readonly err: string | null;
  readonly ack: boolean | null;
}

/** Outbound Message Types */

export interface PsToolsRequest {
  readonly target: string;
  readonly mode: string;
  readonly argument: string;
}

export interface CommandRequest {
  readonly targets: string[];
  readonly type: string;
  readonly parameters: any;
}

export interface RefreshDeviceRequest {
  readonly targets: string[];
}

export interface ClearDeviceRequest {
  readonly targets: string[];
}
