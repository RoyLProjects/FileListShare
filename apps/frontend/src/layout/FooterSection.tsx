import React from "react";

const FooterSection: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 py-12 border-t border-gray-200 dark:border-gray-700">
      <div className="mx-auto px-4 max-w-screen-2xl">
        <div className="md:grid-cols-4 mb-8 grid gap-8">
          <div>
            <div className="items-center mb-4 flex gap-2">
              <div className="w-8 h-8 bg-blue-600 dark:bg-blue-500 rounded-lg items-center justify-center flex">
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
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                FileRequest
              </span>
            </div>
            <p className="text-gray-600 text-sm dark:text-gray-400">
              Simplify document collection with smart file requests.
            </p>
          </div>
          <div>
            <p className="font-semibold text-gray-900 mb-4 dark:text-white">
              About
            </p>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/RoyLProjects/FileListShare"
                  className="text-gray-600 text-sm dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  Github
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-gray-900 mb-4 dark:text-white">
              Resources
            </p>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/RoyLProjects/FileListShare"
                  className="text-gray-600 text-sm dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/RoyLProjects/FileListShare/issues"
                  className="text-gray-600 text-sm dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  Issues
                </a>
              </li>
              <li>
                <a
                  href="/O3hFoUQaK8R9yNGElZVC#"
                  className="text-gray-600 text-sm dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/O3hFoUQaK8R9yNGElZVC#"
                  className="text-gray-600 text-sm dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 md:flex-row justify-between items-center border-t border-gray-200 dark:border-gray-700 flex flex-col gap-4">
          <p className="text-gray-600 text-sm dark:text-gray-400">
            © 2024 FileRequest. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="/https://github.com/RoyLProjects"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                id="Windframe_rBlMcrvyD"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
