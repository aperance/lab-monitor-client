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
  readonly payload: unknown;
}

export interface Configuration {
  readonly title: string;
  readonly columns: Array<{
    property: string;
    title: string;
    replace?: { [x: string]: string };
  }>;
  readonly filters: Array<{
    property: string;
    title: string;
    options: { [x: string]: string };
  }>;
  readonly logLevel: {
    level: string[];
    namespace: string[];
  };
  readonly httpProxy: string;
  readonly logsPath: string;
  readonly statePath: string;
  readonly psTools: {
    [x: string]: {
      name: string;
      mode: string;
      cmd: string;
    };
  };
  readonly vnc: {
    proxyUrl: string;
    port: string;
    username: string;
    password: string;
    passwordEncrypted: string;
  };
}

export interface DeviceDataAll {
  readonly state: {
    [id: string]: { [property: string]: string };
  };
  readonly history: {
    [id: string]: { [property: string]: Array<[string, string | null]> };
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
