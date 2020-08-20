import {
  useSelector as useReduxSelector,
  TypedUseSelectorHook
} from "react-redux";
import {StoreState} from "../redux/store";

export const useSelector: TypedUseSelectorHook<StoreState> = useReduxSelector;
