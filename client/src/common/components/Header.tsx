import { Link } from "react-router-dom";
import Logo from "../../assets/img/LeaseNxt-Logo.png";

export const Header = () => {
  return (
    <header className="py-6 px-2 mb-12 border-b">
      <div className="container mx-auto flex justify-between items-center">
        {/* logo */}
        <Link to="/">
          <img src={Logo} alt="Logo" className="w-20 h-auto rounded-lg" />
        </Link>
        {/* buttons */}
        <div className="flex items-center gap-6">
          <Link to="" className="hover:text-blue-700 transition">
            Log In
          </Link>
          <Link
            to=""
            className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-3 rounded-lg transition"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
};
