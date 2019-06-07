export interface DeviceResponseState {
  command: { err: Error | null; results: any[] | null };
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
