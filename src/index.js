import React from "react";
import ReactDOM from "react-dom/client";
import "styles/index.css";
import App from "./App";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store } from "./reducers/store";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <App />
    <ToastContainer
      position="top-right"
      autoClose={1500}
      hideProgressBar={false}
      closeOnClick={true}
      pauseOnHover={true}
      draggable={true}
      progress={undefined}
      theme="light"
    />
  </Provider>
);
