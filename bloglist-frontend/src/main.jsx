import ReactDOM from "react-dom/client";

import "./index.css";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
