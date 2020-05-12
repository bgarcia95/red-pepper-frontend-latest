import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Layout from "./hoc/Layout";
import { trySignUp } from "./redux/actions/auth/auth";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const onTrySignUp = () => dispatch(trySignUp());
    onTrySignUp();
  }, [dispatch]);

  return (
    <React.Fragment>
      <Layout />
    </React.Fragment>
  );
};

export default App;
