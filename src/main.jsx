import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import ContextProvider from "./context/context.jsx";
import App from "./App.jsx";
import "./index.css";

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === "development") {
  import("./mocks/browser.js").then(({ worker }) => {
    worker.start();
  });
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <ContextProvider>
      <App />
    </ContextProvider>
  </Router>
);
