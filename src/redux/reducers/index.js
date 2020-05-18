import { combineReducers } from "redux";
import suppliesReducer from "./supplies/supplies";
import suppliersReducer from "./suppliers/suppliers";
import purchasesReducer from "./supplies-purchases/purchases";
import categoriesReducer from "./categories/categories";
import dishesReducer from "./dishes/dishes";
import combosReducer from "./combos/combos";
import tokenReducer from "./auth/auth";

export default combineReducers({
  supplies: suppliesReducer,
  suppliers: suppliersReducer,
  purchases: purchasesReducer,
  categories: categoriesReducer,
  dishes: dishesReducer,
  combos: combosReducer,
  auth: tokenReducer,
});
