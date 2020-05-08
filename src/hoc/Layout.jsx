import React from "react";
import Navigation from "../components/Navigation/Navigation";
import { makeStyles } from "@material-ui/core";
import AppRouter from "../router/AppRouter";

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

const Layout = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Navigation />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <AppRouter />
      </main>
    </div>
  );
};

export default Layout;
