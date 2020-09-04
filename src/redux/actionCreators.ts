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

type DeviceDataAll = {
  state: {
    [deviceId: string]: { [property: string]: string };
  };
  history: {
    [deviceId: string]: { [property: string]: [string, string | null][] };
  };
};

type DeviceDataUpdate = {
  id: string;
  state: { [property: string]: string | null } | null;
  history: [string, [string, string | null]][] | null;
};

type PsToolsResponse = {
  result: string;
};

type CommandResponse = {
  err: string | null;
  ack: boolean | null;
};

type Action<T extends ActionTypes, P = null> = {
  type: T;
  payload: P;
};

export type Actions =
  | Action<ActionTypes.DEVICE_DATA_ALL, DeviceDataAll>
  | Action<ActionTypes.DEVICE_DATA_UPDATE, DeviceDataUpdate>
  | Action<ActionTypes.PSTOOLS_RESPONSE, PsToolsResponse>
  | Action<ActionTypes.PSTOOLS_RESPONSE_CLEAR>
  | Action<ActionTypes.COMMAND_RESPONSE, CommandResponse>
  | Action<ActionTypes.SINGLE_ROW_SELECT, { row: string | null }>
  | Action<ActionTypes.MULTI_ROW_SELECT, { row: string | null }>
  | Action<ActionTypes.VIEW_SELECT, { view: string }>
  | Action<ActionTypes.PROXY_TOGGLE>
  | Action<ActionTypes.DRAGGING_SET, { isDragging: boolean }>
  | Action<ActionTypes.RESET_ALL>;

export const deviceDataAll = (payload: DeviceDataAll): Actions => ({
  type: ActionTypes.DEVICE_DATA_ALL,
  payload
});

export const deviceDataUpdate = (payload: DeviceDataUpdate): Actions => ({
  type: ActionTypes.DEVICE_DATA_UPDATE,
  payload
});

export const psToolsResponse = (payload: PsToolsResponse): Actions => ({
  type: ActionTypes.PSTOOLS_RESPONSE,
  payload
});

export const psToolsResponseClear = (): Actions => ({
  type: ActionTypes.PSTOOLS_RESPONSE_CLEAR,
  payload: null
});

export const deviceCommandResponse = (payload: CommandResponse): Actions => ({
  type: ActionTypes.COMMAND_RESPONSE,
  payload
});

export const singleRowSelect = (row: string | null): Actions => ({
  type: ActionTypes.SINGLE_ROW_SELECT,
  payload: { row }
});

export const multiRowSelect = (row: string | null): Actions => ({
  type: ActionTypes.MULTI_ROW_SELECT,
  payload: { row }
});

export const viewSelect = (view: string): Actions => ({
  type: ActionTypes.VIEW_SELECT,
  payload: { view }
});

export const proxyToggle = (): Actions => ({
  type: ActionTypes.PROXY_TOGGLE,
  payload: null
});

export const draggingSet = (isDragging: boolean): Actions => ({
  type: ActionTypes.DRAGGING_SET,
  payload: { isDragging }
});

export const resetAll = (): Actions => ({
  type: ActionTypes.RESET_ALL,
  payload: null
});
