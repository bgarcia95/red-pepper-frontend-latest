import React, { useEffect } from "react";
import Navigation from "components/Navigation/Navigation";
import { makeStyles } from "@material-ui/core";
import AppRouter from "router/AppRouter";
import { useDispatch } from "react-redux";
import { logoutAction } from "redux/actions/auth/auth";
import { withRouter } from "react-router-dom";
import { tryAutoSignIn } from "redux/actions/auth/auth";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const Layout = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    location: { pathname },
    history,
  } = props;

  useEffect(() => {
    const onTryAutoSignIn = () => dispatch(tryAutoSignIn());
    onTryAutoSignIn();

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
      pathname !== "/ordenes/elegir-mesa"
    ) {
      history.push("/insumos");
    } else {
      history.push(pathname);
    }
  }, [dispatch, pathname, history]);

  const logoutHandler = () => {
    dispatch(logoutAction());
    props.history.push("/login");
  };

  return (
    <div className={classes.root}>
      <Navigation
        isAuthenticated={props.isAuthenticated}
        onLogout={logoutHandler}
        location={pathname}
      />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <AppRouter isAuthenticated={props.isAuthenticated} />
      </main>
    </div>
  );
};

Layout.propTypes = {
  pathname: PropTypes.string,
  history: PropTypes.object.isRequired,
};

export default withRouter(Layout);
