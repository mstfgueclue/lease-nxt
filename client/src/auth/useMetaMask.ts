import { useContext } from "react";
import { MetaMaskContext } from "./MetaMaskContext";

export const useMetaMask = () => {
  const context = useContext(MetaMaskContext);
  if (!context) {
    throw new Error("useMetaMask must be used within a MetaMaskProvider");
  }
  return context;
};
