import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import "./styling/basic.css";
import { store } from "./store/store";
const r = document.getElementById("root");
const gg = createRoot(r);
gg.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
