import { applyMiddleware, createStore, compose } from "redux";
import logger from "redux-logger";
import reducer from "./reducers";

export default createStore(
  reducer,
  compose(
    applyMiddleware(logger),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
