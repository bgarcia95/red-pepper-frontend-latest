import React from "react";
import { useSelector } from "react-redux";
import Layout from "hoc/Layout";
import { Backdrop, CircularProgress, Typography } from "@material-ui/core";

const App = () => {
  const isLogging = useSelector((state) => state.auth.isLogging);
  const isAuthenticated = useSelector((state) => state.auth.token);

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
      <Layout isAuthenticated={isAuthenticated} />
    </React.Fragment>
  );
};

export default App;
