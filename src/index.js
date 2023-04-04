import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./assets/boxicons-2.0.7/css/boxicons.min.css";
import { Provider } from "react-redux";
import store from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //<React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  //</React.StrictMode>
);
