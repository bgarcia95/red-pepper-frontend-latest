import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Supplies from "../pages/Supplies/Supplies";
import Supppliers from "../pages/Suppliers/Suppliers";
import SuppliesPurchase from "../pages/SuppliesPurchase/SuppliesPurchase";
import Categories from "../pages/Categories/Categories";
import Dishes from "../pages/Dishes/Dishes";
import Combos from "../pages/Combos/Combos";
import Tables from "../pages/Tables/Tables";
import Login from "../pages/Login/Login";

const AppRouter = (props) => {
  const { isAuthenticated } = props;
  let appRoutes = (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/" component={Login} />
      <Redirect from="/" exact to="login" />
    </Switch>
  );

  if (isAuthenticated) {
    appRoutes = (
      <Switch>
        <Route path="/supplies" component={Supplies} />
        <Route path="/suppliers" component={Supppliers} />
        <Route path="/supplies-purchase" component={SuppliesPurchase} />
        <Route path="/categories" component={Categories} />
        <Route path="/dishes" component={Dishes} />
        <Route path="/combos" component={Combos} />
        <Route path="/tables" component={Tables} />
        {/* <Route path="/login" component={Login} /> */}
        {/* <Route path="/" component={Supplies} /> */}
        <Redirect from="/" exact to="supplies" />
      </Switch>
    );
  }

  return appRoutes;
};

export default AppRouter;
