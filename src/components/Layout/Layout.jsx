import React from "react";
import Navigation from "components/Navigation/Navigation";
import { makeStyles } from "@material-ui/core";
import AppRouter from "router/AppRouter";
import { useDispatch } from "react-redux";
import { logoutAction } from "redux/actions/auth/auth";
import { withRouter } from "react-router-dom";
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

  const logoutHandler = () => {
    dispatch(logoutAction());
    history.push("/login");
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
