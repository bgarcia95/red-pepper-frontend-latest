import { combineReducers } from "redux";
import suppliesReducer from "./supplies/supplies";

export default combineReducers({
  supplies: suppliesReducer,
});
