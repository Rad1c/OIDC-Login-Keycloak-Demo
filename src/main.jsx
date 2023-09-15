import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { MsalInstance } from "./helpers/msal-auth.js";
import { MsalProvider } from "@azure/msal-react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MsalProvider instance={MsalInstance}>
      <App />
    </MsalProvider>
  </React.StrictMode>
);
