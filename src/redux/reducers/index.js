import { combineReducers } from "redux";
import suppliesReducer from "./supplies/supplies";
import suppliersReducer from "./suppliers/suppliers";

export default combineReducers({
  supplies: suppliesReducer,
  suppliers: suppliersReducer,
});
