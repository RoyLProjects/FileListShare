import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import UserMenu from "../components/UserMenu";
import useAuth from "../hooks/User";

const HeaderSection: React.FC = () => {
  const { user, loading } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <nav className="mx-auto px-4 py-4 items-center justify-between max-w-screen-2xl flex">
        <Link
          to="/"
          onClick={() => setIsMenuOpen(false)}
          className="items-center flex gap-2"
        >
          <div className="w-10 h-10 bg-blue-600 dark:bg-blue-500 rounded-lg items-center justify-center flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="size-6 stroke-white stroke-[2.5]"
              fill="none"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
              />
            </svg>
          </div>
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            FileListShare
          </span>
        </Link>

        {/* Hamburger menu button - visible on small screens */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>

        {/* Desktop menu - hidden on small screens */}
        <div className="items-center gap-4 hidden md:flex">
          {!loading && (
            <>
              {!user ? (
                <>
                  <Link
                    to="/login"
                    className="text-gray-600 font-medium px-4 py-2 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  >
                    Login
                  </Link>
                  <Link
                    to="/login"
                    className="bg-blue-600 dark:bg-blue-500 text-white font-medium px-6 py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <>
                  <button
                    onClick={() => navigate("/")}
                    className={`text-gray-600 font-medium px-3 py-2 rounded-lg dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors ${
                      location.pathname === "/"
                        ? "bg-gray-100 dark:bg-gray-700"
                        : ""
                    }`}
                  >
                    Home
                  </button>
                  <button
                    type="submit"
                    className="dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors px-4 py-2 text-sm font-medium text-neutral-700"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                      ></path>
                    </svg>
                  </button>
                  <UserMenu userName={user?.name} userEmail={user?.email} />
                </>
              )}
            </>
          )}
        </div>
      </nav>

      {/* Mobile menu - visible when hamburger is clicked */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="px-4 py-4 flex flex-col gap-3">
            <a
              href="/docs"
              className="text-gray-600 font-medium dark:text-gray-300 hover:text-gray-900 dark:hover:text-white py-2"
            >
              Documentation
            </a>
            {!loading && (
              <>
                {!user ? (
                  <>
                    <Link
                      to="/login"
                      className="text-gray-600 font-medium py-2 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="bg-blue-600 dark:bg-blue-500 text-white font-medium px-6 py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors text-center"
                    >
                      Sign Up
                    </Link>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        navigate("/");
                        setIsMenuOpen(false);
                      }}
                      className={`text-left text-gray-600 font-medium py-2 px-3 rounded-lg dark:text-gray-300 hover:text-gray-900 dark:hover:text-white ${
                        location.pathname === "/"
                          ? "bg-gray-100 dark:bg-gray-700"
                          : ""
                      }`}
                    >
                      Home
                    </button>

                    <button
                      onClick={() => {
                        navigate("/settings");
                        setIsMenuOpen(false);
                      }}
                      className={`text-left text-gray-600 font-medium py-2 px-3 rounded-lg dark:text-gray-300 hover:text-gray-900 dark:hover:text-white ${
                        location.pathname === "/settings"
                          ? "bg-gray-100 dark:bg-gray-700"
                          : ""
                      }`}
                    >
                      Settings
                    </button>
                    <a
                      href="/api/v1/auth/logout"
                      className="text-gray-600 font-medium dark:text-gray-300 hover:text-gray-900 dark:hover:text-white py-2"
                    >
                      Logout {user?.name ? `(${user.name})` : ""}
                    </a>
                  </>
                )}
              </>
            )}
            <a
              href="https://github.com/RoyLProjects/FileListShare"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-400 transition-colors py-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default HeaderSection;
