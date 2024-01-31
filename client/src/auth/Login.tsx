import {} from "@metamask/sdk-react";
import { useMetaMask } from "./useMetaMask";

export const Login = () => {
  const { connectMetaMask, wallet, isConnecting, hasProvider } = useMetaMask();

  if (!window.ethereum) {
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
            Connect to MetaMask
          </div>
          <div>
            {hasProvider ? (
              <div>
                <div className="flex flex-col mb-4">
                  {wallet.chainId && (
                    <label className="block mb-2">
                      Connected chain: {wallet.chainId}
                    </label>
                  )}

                  {wallet.accounts && (
                    <label className="block mb-2">
                      Connected account: {wallet.accounts}
                    </label>
                  )}

                  {wallet.balance && (
                    <label className="block mb-2">
                      Balance: {wallet.balance}
                    </label>
                  )}
                </div>

                <button
                  type="submit"
                  // onClick={disconnectMetaMask}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Disconnect
                </button>
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
