import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { queryClient } from "../react-query";
import App from "./App";
import "./index.css";
import { MetaMaskContextProvider } from "./auth/MetaMaskContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MetaMaskContextProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </MetaMaskContextProvider>
  </React.StrictMode>
);
