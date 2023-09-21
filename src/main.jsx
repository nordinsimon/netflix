import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import ContextProvider from "./context/context.jsx";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <ContextProvider>
      <App />
    </ContextProvider>
  </Router>
);
