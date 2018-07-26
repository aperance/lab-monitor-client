export interface ActionResponseState
  extends Array<{
      err: Error | null;
      results: any[] | null;
    }> {}

export interface DialogState {
  logLevel: boolean;
}

export interface HistoryDataState {
  [id: string]: {
    [property: string]: Array<[string, string | null]>;
  };
}

export interface PsToolsState {
  err: Error | null;
  result: string | null;
}

export interface TableDataState {
  [id: string]: {
    [property: string]: string | null;
  };
}

export interface UserSelectionState {
  rows: string[];
  view: string | null;
  history: string | null;
  filters: {
    [property: string]: string[];
  };
}

export interface StoreState {
  configuration: any;
  tableData: TableDataState;
  userSelection: UserSelectionState;
  historyData: HistoryDataState;
  dialog: DialogState;
  psTools: PsToolsState;
  actionResponse: ActionResponseState;
}
