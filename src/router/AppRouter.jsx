import React from "react";
import { Switch, Route } from "react-router-dom";
import Supplies from "../pages/Supplies/Supplies";
import Supppliers from "../pages/Suppliers/Suppliers";
import SuppliesPurchase from "../pages/SuppliesPurchase/SuppliesPurchase";
import Categories from "../pages/Categories/Categories";
import Dishes from "../pages/Dishes/Dishes";
import Combos from "../pages/Combos/Combos";
import Tables from "../pages/Tables/Tables";

const AppRouter = () => {
  return (
    <Switch>
      <Route path="/supplies" component={Supplies} />
      <Route path="/suppliers" component={Supppliers} />
      <Route path="/supplies-purchase" component={SuppliesPurchase} />
      <Route path="categories" component={Categories} />
      <Route path="/dishes" component={Dishes} />
      <Route path="/combos" component={Combos} />
      <Route path="/tables" component={Tables} />
    </Switch>
  );
};

export default AppRouter;
