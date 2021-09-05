import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "./App.css";
import "./blog.css";
import "./profile.css";

import { BrowserRouter as Router } from "react-router-dom";
import { ContextProvider } from "./context/context";

ReactDOM.render(
  <Router>
    <ContextProvider>
      <App />
    </ContextProvider>
  </Router>,
  document.getElementById("root")
);
