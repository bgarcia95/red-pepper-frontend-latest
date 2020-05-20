import { combineReducers } from "redux";
import suppliesReducer from "redux/reducers/supplies/supplies";
import suppliersReducer from "redux/reducers/suppliers/suppliers";
import purchasesReducer from "redux/reducers/supplies-purchases/purchases";
import categoriesReducer from "redux/reducers/categories/categories";
import dishesReducer from "redux/reducers/dishes/dishes";
import combosReducer from "redux/reducers/combos/combos";
import tablesReducer from "redux/reducers/tables/tables";
import tokenReducer from "redux/reducers/auth/auth";

export default combineReducers({
  supplies: suppliesReducer,
  suppliers: suppliersReducer,
  purchases: purchasesReducer,
  categories: categoriesReducer,
  dishes: dishesReducer,
  combos: combosReducer,
  tables: tablesReducer,
  auth: tokenReducer,
});
