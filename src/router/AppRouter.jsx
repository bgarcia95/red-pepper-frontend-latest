import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Supplies from "pages/Supplies/Supplies";
import Supppliers from "pages/Suppliers/Suppliers";
import SuppliesPurchase from "pages/SuppliesPurchase/SuppliesPurchase";
import Categories from "pages/Categories/Categories";
import Dishes from "pages/Dishes/Dishes";
import Combos from "pages/Combos/Combos";
import Tables from "pages/Tables/Tables";
import Login from "pages/Login/Login";
import Employees from "pages/Employees/Employees";
import Customers from "pages/Customers/Customers";
import Orders from "pages/Orders/Orders";
import { tryAutoSignIn } from "redux/actions/auth/auth";
import { useDispatch } from "react-redux";

const AppRouter = (props) => {
  const { isAuthenticated, location } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    const onTryAutoSignIn = () => dispatch(tryAutoSignIn());
    onTryAutoSignIn();

    props.history.push(location);
  }, [dispatch, location, props.history]);

  let appRoutes = null;

  appRoutes = (
    <Switch>
      {/* <Route exact path="/" component={Login} /> */}
      <Route path="/login" component={Login} />
      {/* This one will catch anything that has no route. */}
      <Route
        render={() => (
          <Redirect
            to={{
              pathname: "/login",
            }}
          />
        )}
      />
    </Switch>
  );

  if (isAuthenticated) {
    appRoutes = (
      <Switch>
        <Route path="/insumos" component={Supplies} />
        <Route path="/proveedores" component={Supppliers} />
        <Route path="/compra-insumos" component={SuppliesPurchase} />
        <Route path="/categorias" component={Categories} />
        <Route path="/platos" component={Dishes} />
        <Route path="/combos" component={Combos} />
        <Route path="/mesas" component={Tables} />
        <Route path="/empleados" component={Employees} />
        <Route path="/clientes" component={Customers} />
        <Route path="/ordenes" component={Orders} />
        {/* This one will catch anything that has no route. */}
        <Route render={() => <Redirect to={{ pathname: "/insumos" }} />} />
      </Switch>
    );
  }

  return appRoutes;
};

export default AppRouter;
