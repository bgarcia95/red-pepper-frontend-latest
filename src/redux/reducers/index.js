import { combineReducers } from "redux";
import suppliesReducer from "./supplies/supplies";
import suppliersReducer from "./suppliers/suppliers";
import purchasesReducer from "./supplies-purchases/purchases";
import categoriesReducer from "./categories/categories";
import tokenReducer from "./auth/auth";

export default combineReducers({
  supplies: suppliesReducer,
  suppliers: suppliersReducer,
  purchases: purchasesReducer,
  categories: categoriesReducer,
  auth: tokenReducer,
});
