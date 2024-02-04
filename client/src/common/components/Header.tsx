import { Link } from "react-router-dom";
import Logo from "../../assets/img/LeaseNxt-Logo.png";
import { useMetaMask } from "../../auth/useMetaMask";

export const Header = () => {
  const { isConnected } = useMetaMask();

  return (
    <header className="py-6 px-2 mb-12 border-b">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/">
          <img src={Logo} alt="Logo" className="w-20 h-auto rounded-lg" />
        </Link>

        <div className="flex items-center gap-6">
          {isConnected ? (
            <Link
              className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-3 rounded-lg transition"
              to="/login"
            >
              Wallet
            </Link>
          ) : (
            <Link
              className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-3 rounded-lg transition"
              to="/login"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
