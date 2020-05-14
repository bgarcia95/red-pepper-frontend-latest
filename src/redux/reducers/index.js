import { combineReducers } from "redux";
import suppliesReducer from "./supplies/supplies";
import suppliersReducer from "./suppliers/suppliers";
import purchasesReducer from "./supplies-purchases/purchases";
import tokenReducer from "./auth/auth";

export default combineReducers({
  supplies: suppliesReducer,
  suppliers: suppliersReducer,
  purchases: purchasesReducer,
  auth: tokenReducer,
});
