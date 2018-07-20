import {
  ACTION_RESPONSE_SET,
  ACTION_RESPONSE_CLEAR
} from "../actions/actionTypes";

interface IResult {
  err: Error | null;
  results: any[] | null;
}

interface IState extends Array<IResult> {}

interface IAction {
  type: string;
  result: IResult;
}

const initialState: IState = [];

export default (state = initialState, action: IAction) => {
  switch (action.type) {
    case ACTION_RESPONSE_SET:
      return [action.result];
    case ACTION_RESPONSE_CLEAR:
      return [];
    default:
      return [...state];
  }
};
