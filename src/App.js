import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Layout from "components/Layout/Layout";
import { Backdrop, CircularProgress, Typography } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { tryAutoSignIn } from "redux/actions/auth/auth";

const App = (props) => {
  const isLogging = useSelector((state) => state.auth.isLogging);
  const isAuthenticated = useSelector((state) => state.auth.token);

  const dispatch = useDispatch();
  const {
    location: { pathname },
    history,
  } = props;

  useEffect(() => {
    const onTryAutoSignIn = () => dispatch(tryAutoSignIn());
    onTryAutoSignIn();

    console.log("Auth success");
  }, [dispatch]);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      history.replace("/login");
    } else if (
      localStorage.getItem("token") &&
      pathname !== "/insumos" &&
      pathname !== "/proveedores" &&
      pathname !== "/compra-insumos" &&
      pathname !== "/categorias" &&
      pathname !== "/platos" &&
      pathname !== "/combos" &&
      pathname !== "/mesas" &&
      pathname !== "/empleados" &&
      pathname !== "/clientes" &&
      pathname !== "/ordenes" &&
      pathname !== "/ordenes/elegir-mesa" &&
      pathname !== "/ordenes/preparar-orden"
    ) {
      history.push("/insumos");
    } else {
      history.push(pathname);
    }
  }, [pathname, history]);

  return (
    <React.Fragment>
      {isLogging ? (
        <Backdrop id="myBackdrop" className="backdrop" open={true}>
          <div className="backdrop--login">
            <CircularProgress style={{ color: "#fff" }} />
            <Typography variant="h5">Iniciando Sesión..</Typography>
          </div>
        </Backdrop>
      ) : null}
      <Layout
        isAuthenticated={isAuthenticated}
        pathname={pathname}
        history={history}
      />
    </React.Fragment>
  );
};

export default withRouter(App);
