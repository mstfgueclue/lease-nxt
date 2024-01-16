import React, { ReactNode } from "react";
import { Link } from "react-router-dom";

interface MainAppBarLayoutProps {
  children: ReactNode;
}

export const MainAppBarLayout: React.FC<MainAppBarLayoutProps> = ({
  children,
}) => {
  return (
    <div>
      <div className="fixed top-0 left-0 w-full bg-gray-100 text-gray-800 p-4 z-10">
        <div className="max-w-7xl mx-auto flex justify-between">
          <div>
            <Link
              to="/list-properties"
              className="hover:bg-blue-200 px-3 py-2 rounded"
            >
              List Properties
            </Link>
            <Link
              to="/view-properties"
              className="hover:bg-blue-200 px-3 py-2 rounded"
            >
              View Properties
            </Link>
          </div>
          <div>
            <Link to="/login" className="hover:bg-blue-200 px-3 py-2 rounded">
              Login
            </Link>
            <Link to="/sign-up" className="hover:bg-blue-200 px-3 py-2 rounded">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
      <div className="content"> {children}</div>
    </div>
  );
};
