import React from "react";
import Navigation from "../components/Navigation/Navigation";
import { makeStyles } from "@material-ui/core";
import AppRouter from "../router/AppRouter";
import { useDispatch, connect } from "react-redux";
import { logoutAction } from "../redux/actions/auth/auth";
import { withRouter } from "react-router-dom";

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
  const { isAuthenticated } = props;

  const logoutHandler = () => {
    dispatch(logoutAction());
    props.history.push("/");
  };

  return (
    <div className={classes.root}>
      <Navigation isAuthenticated={isAuthenticated} onLogout={logoutHandler} />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <AppRouter isAuthenticated={isAuthenticated} />
      </main>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token,
  };
};
export default withRouter(connect(mapStateToProps)(Layout));
