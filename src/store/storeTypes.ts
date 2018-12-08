export interface DeviceResponseState {
  command: { err: Error | null; results: any[] | null };
  psTools: {
    err: Error | null;
    result: string | null;
  };
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
