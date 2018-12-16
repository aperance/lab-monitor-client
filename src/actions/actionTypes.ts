import { Action } from "redux";

export enum ActionTypeKeys {
  SINGLE_ROW_SELECT = "SINGLE_ROW_SELECT",
  MULTI_ROW_SELECT = "MULTI_ROW_SELECT",
  VIEW_SELECT = "VIEW_SELECT",
  PROXY_TOGGLE = "PROXY_TOGGLE",
  PSTOOLS_RESPONSE = "PSTOOLS_RESPONSE",
  DEVICE_DATA_ALL = "DEVICE_DATA_ALL",
  DEVICE_DATA_UPDATE = "DEVICE_DATA_UPDATE",
  RESET_ALL = "RESET_ALL",
  COMMAND_RESPONSE = "COMMAND_RESPONSE",
  DRAGGING_SET = "DRAGGING_SET"
}

/** Action Interfaces */

interface DeviceDataAllAction extends Action<ActionTypeKeys.DEVICE_DATA_ALL> {
  state: {
    [id: string]: { [property: string]: string };
  };
  history: {
    [id: string]: { [property: string]: Array<[string, string | null]> };
  };
}

interface DeviceDataUpdateAction
  extends Action<ActionTypeKeys.DEVICE_DATA_UPDATE> {
  id: string;
  state: { [property: string]: string | null };
  history: Array<[string, [string, string | null]]>;
}

interface PsToolsResponseAction
  extends Action<ActionTypeKeys.PSTOOLS_RESPONSE> {
  err: Error | null;
  result: string | null;
}

interface CommandResponseAction
  extends Action<ActionTypeKeys.COMMAND_RESPONSE> {
  err: Error | null;
  results: Array<{
    err: Error | null;
    success: boolean;
  }> | null;
}

interface SingleRowSelectAction
  extends Action<ActionTypeKeys.SINGLE_ROW_SELECT> {
  row: string | null;
}

interface MultiRowSelectAction extends Action<ActionTypeKeys.MULTI_ROW_SELECT> {
  row: string | null;
}

interface ViewSelectAction extends Action<ActionTypeKeys.VIEW_SELECT> {
  view: string;
}

interface ProxyToggleAction extends Action<ActionTypeKeys.PROXY_TOGGLE> {}

interface DraggingSetAction extends Action<ActionTypeKeys.DRAGGING_SET> {
  isDragging: boolean;
}

interface ResetAllAction extends Action<ActionTypeKeys.RESET_ALL> {}

export type Actions =
  | DeviceDataAllAction
  | DeviceDataUpdateAction
  | SingleRowSelectAction
  | MultiRowSelectAction
  | ViewSelectAction
  | ProxyToggleAction
  | PsToolsResponseAction
  | CommandResponseAction
  | DraggingSetAction
  | ResetAllAction;

/** Action Creator Interfaces */

export interface DeviceDataAllActionCreator {
  (
    payload: {
      state: {
        [id: string]: { [property: string]: string };
      };
      history: {
        [id: string]: { [property: string]: Array<[string, string | null]> };
      };
    }
  ): DeviceDataAllAction;
}

export interface DeviceDataUpdateActionCreator {
  (
    payload: {
      id: string;
      state: { [property: string]: string | null };
      history: Array<[string, [string, string | null]]>;
    }
  ): DeviceDataUpdateAction;
}

export interface PsToolsResponseActionCreator {
  (
    payload: {
      err: Error | null;
      result: string | null;
    }
  ): PsToolsResponseAction;
}

export interface CommandResponseActionCreator {
  (
    payload: {
      err: Error | null;
      results: Array<{
        err: Error | null;
        success: boolean;
      }> | null;
    }
  ): CommandResponseAction;
}

export interface SingleRowSelectActionCreator {
  (row: string | null): SingleRowSelectAction;
}

export interface MultiRowSelectActionCreator {
  (row: string | null): MultiRowSelectAction;
}

export interface ViewSelectActionCreator {
  (view: string): ViewSelectAction;
}

export interface ProxyToggleActionCreator {
  (): ProxyToggleAction;
}

export interface DraggingSetActionCreator {
  (isDragging: boolean): DraggingSetAction;
}

export interface ResetAllActionCreator {
  (): ResetAllAction;
}
