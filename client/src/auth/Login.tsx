import {} from "@metamask/sdk-react";
import { useMetaMask } from "./useMetaMask";

export const Login = () => {
  const { connectMetaMask, wallet, isConnecting, isConnected, hasProvider } =
    useMetaMask();

  if (!hasProvider) {
    return (
      <div className="container mx-auto">
        <div className="flex justify-center h-screen items-start">
          <div className="w-full max-w-[400px]">
            <div className="text-center text-3xl font-semibold mb-8">
              <p>Please install MetaMask extension to continue</p>
            </div>
            <div>
              <button
                type="submit"
                onClick={() => {
                  window.open("https://metamask.io/download.html");
                }}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Install MetaMask
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto mb-14 h-screen max-h-[885px] ">
      <div className="flex justify-center items-start">
        <div className="w-full max-w-[400px]">
          <div className="text-center text-3xl font-semibold mb-8">
            🦊 MetaMask Overview
          </div>
          <div>
            {isConnected ? (
              <div>
                <div className="flex flex-col mb-4 space-y-4">
                  <div>
                    <label className="mb-2 font-bold">Connected chain:</label>
                    <div className="bg-gray-100 rounded-lg px-4 py-2">
                      {wallet.chainId}
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 font-bold">Connected account:</label>
                    <div className="bg-gray-100 rounded-lg px-4 py-2">
                      {wallet.accounts[0]}
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 font-bold">Balance:</label>
                    <div className="bg-gray-100 rounded-lg px-4 py-2">
                      {wallet.balance} ETH
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-600">
                  You can only disconnect your account in the MetaMask extension
                </p>
              </div>
            ) : (
              <button
                type="submit"
                disabled={isConnecting}
                onClick={connectMetaMask}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Connect
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
