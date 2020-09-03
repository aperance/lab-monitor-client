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
  readonly result: string;
}

export interface CommandResponse {
  readonly err: string | null;
  readonly ack: boolean | null;
}

/** Redux Store Types */

export interface DeviceResponseState {
  command: { err: string | null; ack: boolean | null };
  psTools: string;
}

export interface HistoryDataState {
  [id: string]: {
    [property: string]: Array<[string, string | null]>;
  };
}

export interface TableDataState {
  [id: string]: {
    [property: string]: string | null;
  };
}

export interface UserSelectionState {
  rows: string[];
  view: string | null;
  proxy: boolean;
  dragging: boolean;
}

export interface StoreState {
  tableData: TableDataState;
  historyData: HistoryDataState;
  deviceResponse: DeviceResponseState;
  userSelection: UserSelectionState;
}

export interface ActionWithoutPayload<T> {
  type: T;
}

export interface ActionWithPayload<T, P> {
  type: T;
  payload: P;
}

export enum ActionTypes {
  SINGLE_ROW_SELECT = "SINGLE_ROW_SELECT",
  MULTI_ROW_SELECT = "MULTI_ROW_SELECT",
  VIEW_SELECT = "VIEW_SELECT",
  PROXY_TOGGLE = "PROXY_TOGGLE",
  PSTOOLS_RESPONSE = "PSTOOLS_RESPONSE",
  PSTOOLS_RESPONSE_CLEAR = "PSTOOLS_RESPONSE_CLEAR",
  DEVICE_DATA_ALL = "DEVICE_DATA_ALL",
  DEVICE_DATA_UPDATE = "DEVICE_DATA_UPDATE",
  RESET_ALL = "RESET_ALL",
  COMMAND_RESPONSE = "COMMAND_RESPONSE",
  DRAGGING_SET = "DRAGGING_SET"
}

export type Actions =
  | ActionWithPayload<ActionTypes.DEVICE_DATA_ALL, DeviceDataAll>
  | ActionWithPayload<ActionTypes.DEVICE_DATA_UPDATE, DeviceDataUpdate>
  | ActionWithPayload<ActionTypes.PSTOOLS_RESPONSE, PsToolsResponse>
  | ActionWithoutPayload<ActionTypes.PSTOOLS_RESPONSE_CLEAR>
  | ActionWithPayload<ActionTypes.COMMAND_RESPONSE, CommandResponse>
  | ActionWithPayload<ActionTypes.SINGLE_ROW_SELECT, { row: string | null }>
  | ActionWithPayload<ActionTypes.MULTI_ROW_SELECT, { row: string | null }>
  | ActionWithPayload<ActionTypes.VIEW_SELECT, { view: string }>
  | ActionWithoutPayload<ActionTypes.PROXY_TOGGLE>
  | ActionWithPayload<ActionTypes.DRAGGING_SET, { isDragging: boolean }>
  | ActionWithoutPayload<ActionTypes.RESET_ALL>;
