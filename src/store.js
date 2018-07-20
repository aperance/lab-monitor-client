import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import reducer from "./reducers/index";

export default createStore(reducer, compose(applyMiddleware(thunk, logger)));
