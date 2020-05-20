import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "hoc/Layout";
import { trySignUp } from "redux/actions/auth/auth";
import {
  makeStyles,
  Backdrop,
  CircularProgress,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "blue",
  },
}));

const App = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const isLogging = useSelector((state) => state.auth.isLogging);

  useEffect(() => {
    const onTrySignUp = () => dispatch(trySignUp());
    onTrySignUp();
  }, [dispatch]);

  return (
    <React.Fragment>
      {isLogging ? (
        <Backdrop id="myBackdrop" className={classes.backdrop} open={true}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress style={{ color: "white" }} />
            <Typography style={{ color: "#fff" }} variant="h5">
              Iniciando Sesión..
            </Typography>
          </div>
        </Backdrop>
      ) : null}
      <Layout />
    </React.Fragment>
  );
};

export default App;
