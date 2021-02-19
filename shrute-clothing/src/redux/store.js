import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";

import rootReducer from "./root-reducer";

const middlewares = [logger]; // catch the actions in an array to console.log

const store = createStore(rootReducer, applyMiddleware(...middlewares)); // can pass logger directly instead of ...middlewares for scalabitlity

export default store;
