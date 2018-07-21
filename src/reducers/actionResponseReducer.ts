import { Actions, IAction } from "../actions/actionTypes";

interface IResult {
  err: Error | null;
  results: any[] | null;
}

interface IState extends Array<IResult> {}

const initialState: IState = [];

export default (state = initialState, action: IAction) => {
  switch (action.type) {
    case Actions.ACTION_RESPONSE_SET:
      return [action.result];
    case Actions.ACTION_RESPONSE_CLEAR:
      return [];
    default:
      return [...state];
  }
};
