import React from "react";
import Layout from "./hoc/Layout";
import { BrowserRouter } from "react-router-dom";
import configureStore from "./redux/store/configureStore";
import { Provider } from "react-redux";

const store = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
