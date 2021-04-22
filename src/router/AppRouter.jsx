import React from "react";
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
import PickTable from "pages/PickTable/PickTable";
import Order from "pages/Orders/Order";
import Proptypes from "prop-types";
import Kitchen from "pages/Kitchen/Kitchen";
import InventoryReporting from "pages/Reporting/InventoryReporting";
import SalesReporting from "pages/Reporting/SalesReporting";
import InventoryAdjustment from "pages/InventoryAdjustment/InventoryAdjustment";

const AppRouter = (props) => {
  const { isAuthenticated } = props;
  const token = localStorage.getItem("token");

  let appRoutes = !token && (
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/cocina" component={Kitchen} />
      {/* This one will catch anything that has no route. */}
      <Redirect to="/login" />

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
        <Route exact path="/ordenes" component={Orders} />
        <Route exact path="/ordenes/elegir-mesa" component={PickTable} />
        <Route path="/ordenes/:tableId/preparar-orden" component={Order} />
        <Route exact path="/reporteria/inventario" component={InventoryReporting} />
        <Route exact path="/reporteria/ventas" component={SalesReporting} />
        <Route exact path="/ajuste-inventario" component={InventoryAdjustment} />

        {/* This one will catch anything that has no route. */}
        <Redirect to="/insumos" />
      </Switch>
    );
  }

  return appRoutes;
};

AppRouter.propTypes = {
  isAuthenticated: Proptypes.string,
};

export default AppRouter;
