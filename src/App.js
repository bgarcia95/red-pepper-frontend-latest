import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "hoc/Layout";
import { trySignUp } from "redux/actions/auth/auth";
import { Backdrop, CircularProgress, Typography } from "@material-ui/core";

const App = () => {
  const dispatch = useDispatch();

  const isLogging = useSelector((state) => state.auth.isLogging);

  useEffect(() => {
    const onTrySignUp = () => dispatch(trySignUp());
    onTrySignUp();
  }, [dispatch]);

  return (
    <React.Fragment>
      {isLogging ? (
        <Backdrop id="myBackdrop" className="backdrop" open={true}>
          <div className="backdrop--login">
            <CircularProgress />
            <Typography variant="h5">Iniciando Sesión..</Typography>
          </div>
        </Backdrop>
      ) : null}
      <Layout />
    </React.Fragment>
  );
};

export default App;
