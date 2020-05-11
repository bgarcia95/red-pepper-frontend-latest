import React from "react";
import configureStore from "./redux/store/configureStore";
import { Provider } from "react-redux";
import Layout from "./hoc/Layout";

const store = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <Layout />
    </Provider>
  );
};

export default App;
