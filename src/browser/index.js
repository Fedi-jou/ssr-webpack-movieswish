import * as React from "react";
import ReactDOM from "react-dom";
import App from "../shared/App";
import { BrowserRouter } from "react-router-dom";
import { GlobalProvider } from "../shared/context/GlobalState";

ReactDOM.hydrate(
  <BrowserRouter>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </BrowserRouter>,
  document.getElementById("app")
);
