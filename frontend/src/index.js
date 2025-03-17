// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
   <SignUpPage />
   
  </React.StrictMode>
);
