import React from "react";

const FeaturesSection: React.FC = () => {
  return (
    <section className="mx-auto py-20 px-4 bg-gray-50 dark:bg-gray-900 max-w-screen-2xl relative isolate overflow-hidden">
      <p className="text-center text-gray-600 mb-2 font-medium tracking-wide dark:text-gray-400 uppercase">
        Features
      </p>
      <p className="text-4xl md:text-6xl font-bold tracking-tight text-center text-gray-900 dark:text-white">
        Discover the power of smart file requests
      </p>
      <p className="mt-5 text-gray-600 text-lg text-center md:max-w-xl mx-auto dark:text-gray-300">
        Create easily shareable file lists, stay organized, and save time when
        exchanging documents with clients or teammates.
      </p>
      <div className="md:grid-cols-2 xl:grid-cols-3 mx-auto mt-10 grid gap-10">
        <div className="rounded-xl justify-center items-center mx-auto px-10 py-24 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 flex flex-col gap-4 max-w-[30rem]">
          <div className="w-16 h-16 bg-white dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300 p-3 border border-gray-300 dark:border-gray-600">
            <svg
              className="w-full h-full"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              id="Windframe_04HW7QK2B"
            >
              {" "}
              <g>
                {" "}
                <path
                  d="M4 8H20M4 8V16.8002C4 17.9203 4 18.4801 4.21799 18.9079C4.40973 19.2842 4.71547 19.5905 5.0918 19.7822C5.5192 20 6.07899 20 7.19691 20H16.8031C17.921 20 18.48 20 18.9074 19.7822C19.2837 19.5905 19.5905 19.2842 19.7822 18.9079C20 18.4805 20 17.9215 20 16.8036V8M4 8V7.2002C4 6.08009 4 5.51962 4.21799 5.0918C4.40973 4.71547 4.71547 4.40973 5.0918 4.21799C5.51962 4 6.08009 4 7.2002 4H8M20 8V7.19691C20 6.07899 20 5.5192 19.7822 5.0918C19.5905 4.71547 19.2837 4.40973 18.9074 4.21799C18.4796 4 17.9203 4 16.8002 4H16M8 4H16M8 4V2M16 4V2M15 12L11 16L9 14"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />{" "}
              </g>{" "}
            </svg>
          </div>
          <p className="text-3xl font-medium text-center text-gray-900 dark:text-white">
            Work management
          </p>
          <p className="text-center text-gray-600 dark:text-gray-300">
            Simplify your workflow with structured request lists. Collect all required documents in one place and eliminate
            endless email threads. Keep your team and clients aligned while
            saving valuable time.
          </p>
        </div>
        <div className="rounded-xl justify-center items-center mx-auto py-24 bg-white dark:bg-gray-800 p-10 border border-gray-300 dark:border-gray-700 flex flex-col gap-4 max-w-[30rem]">
          <div className="w-16 h-16 bg-white dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300 p-3 border border-gray-300 dark:border-gray-600">
            <svg
              className="w-full h-full"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              id="Windframe_9ru6zEDPJ"
            >
              {" "}
              <path
                d="M19.902 13.161a7.876 7.876 0 0 0-3.956-8.1c0-.021.006-.04.006-.061a3.952 3.952 0 0 0-7.904 0c0 .02.006.04.006.06a7.876 7.876 0 0 0-3.956 8.101 3.946 3.946 0 1 0 4.242 5.93 7.855 7.855 0 0 0 7.32 0 3.945 3.945 0 1 0 4.242-5.93zM12 2.051A2.948 2.948 0 1 1 9.052 5 2.951 2.951 0 0 1 12 2.052zM5 19.949A2.948 2.948 0 1 1 7.948 17 2.951 2.951 0 0 1 5 19.948zm3.75-1.76A3.896 3.896 0 0 0 8.952 17a3.952 3.952 0 0 0-3.868-3.944A7.1 7.1 0 0 1 4.996 12a6.977 6.977 0 0 1 3.232-5.885 3.926 3.926 0 0 0 7.544 0A6.977 6.977 0 0 1 19.004 12a7.1 7.1 0 0 1-.088 1.056A3.952 3.952 0 0 0 15.048 17a3.896 3.896 0 0 0 .202 1.188 7.13 7.13 0 0 1-6.5 0zM19 19.948A2.948 2.948 0 1 1 21.948 17 2.951 2.951 0 0 1 19 19.948z"
                fill="currentColor"
              />{" "}
              <path fill="none" d="M0 0h24v24H0z" />{" "}
            </svg>
          </div>
          <p className="text-3xl font-medium text-center text-gray-900 dark:text-white">
            Collaboration
          </p>
          <p className="text-center text-gray-600 dark:text-gray-300">
            Build and manage lists together with your teammates. Track progress and make sure every request is completed efficiently.
          </p>
        </div>
        <div className="rounded-xl justify-center items-center mx-auto py-24 bg-white dark:bg-gray-800 p-10 border border-gray-300 dark:border-gray-700 flex flex-col gap-4 max-w-[30rem]">
          <div className="w-16 h-16 bg-white dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300 p-3 border border-gray-300 dark:border-gray-600">
            <svg
              className="w-full h-full"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              id="Windframe_62qGuVsxH"
            >
              {" "}
              <circle
                cx="12"
                cy="12"
                r="3"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />{" "}
              <circle
                cx="12"
                cy="4"
                r="2"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />{" "}
              <circle
                cx="20"
                cy="12"
                r="2"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />{" "}
              <circle
                cx="4"
                cy="12"
                r="2"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />{" "}
              <circle
                cx="12"
                cy="20"
                r="2"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />{" "}
              <path
                d="M12 6V9"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />{" "}
              <path
                d="M15 12H18"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />{" "}
              <path
                d="M12 15V18"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />{" "}
              <path
                d="M9 12H6"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />{" "}
            </svg>
          </div>
          <p className="text-3xl font-medium text-center text-gray-900 dark:text-white">
            Apps Integration
          </p>
          <p className="text-center text-gray-600 dark:text-gray-300">
            Connect seamlessly with Dropbox for file storage. Easily save and organize all received files directly to your Dropbox account, where you can also apply powerful automation and file-handling logic to streamline your workflows.
          </p>
        </div>
        <div className="rounded-xl justify-center items-center mx-auto py-24 bg-white dark:bg-gray-800 p-10 border border-gray-300 dark:border-gray-700 flex flex-col gap-4 max-w-[30rem]">
          <div className="w-16 h-16 bg-white dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300 p-3 border border-gray-300 dark:border-gray-600">
            <svg
              fill="currentColor"
              className="w-full h-full"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 511 511"
              id="Windframe_cHteWUuV3"
            >
              {" "}
              <g>
                {" "}
                <path d="M415.5,0h-352C54.953,0,48,6.953,48,15.5V32H31.5C22.953,32,16,38.953,16,47.5v448c0,8.547,6.953,15.5,15.5,15.5h352 c8.547,0,15.5-6.953,15.5-15.5V479h16.5c8.547,0,15.5-6.953,15.5-15.5v-448C431,6.953,424.047,0,415.5,0z M384,471.423 c0,0.026-0.004,0.051-0.004,0.077s0.004,0.051,0.004,0.077V495.5c0,0.276-0.224,0.5-0.5,0.5h-352c-0.276,0-0.5-0.224-0.5-0.5v-448 c0-0.276,0.224-0.5,0.5-0.5h23.971c0.01,0,0.019,0.001,0.029,0.001S55.519,47,55.529,47H383.5c0.276,0,0.5,0.224,0.5,0.5V471.423z M416,463.5c0,0.276-0.224,0.5-0.5,0.5H399V47.5c0-8.547-6.953-15.5-15.5-15.5H63V15.5c0-0.276,0.224-0.5,0.5-0.5h352 c0.276,0,0.5,0.224,0.5,0.5V463.5z" />{" "}
                <path d="M335,104H79c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h256c4.142,0,7.5-3.358,7.5-7.5S339.142,104,335,104z" />{" "}
                <path d="M335,200H79c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h256c4.142,0,7.5-3.358,7.5-7.5S339.142,200,335,200z" />{" "}
                <path d="M335,424H79c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h256c4.142,0,7.5-3.358,7.5-7.5S339.142,424,335,424z" />{" "}
                <path d="M335,296H79c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h256c4.142,0,7.5-3.358,7.5-7.5S339.142,296,335,296z" />{" "}
                <path d="M79,151h64c4.142,0,7.5-3.358,7.5-7.5s-3.358-7.5-7.5-7.5H79c-4.142,0-7.5,3.358-7.5,7.5S74.858,151,79,151z" />{" "}
                <path d="m335,136h-160c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5 7.5,7.5h160c4.142,0 7.5-3.358 7.5-7.5s-3.358-7.5-7.5-7.5z" />{" "}
                <path d="M79,183h192c4.142,0,7.5-3.358,7.5-7.5s-3.358-7.5-7.5-7.5H79c-4.142,0-7.5,3.358-7.5,7.5S74.858,183,79,183z" />{" "}
                <path d="m335,168h-32c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5 7.5,7.5h32c4.142,0 7.5-3.358 7.5-7.5s-3.358-7.5-7.5-7.5z" />{" "}
                <path d="M335,392H79c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h256c4.142,0,7.5-3.358,7.5-7.5S339.142,392,335,392z" />{" "}
                <path d="M79,343h64c4.142,0,7.5-3.358,7.5-7.5s-3.358-7.5-7.5-7.5H79c-4.142,0-7.5,3.358-7.5,7.5S74.858,343,79,343z" />{" "}
                <path d="m335,328h-160c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5 7.5,7.5h160c4.142,0 7.5-3.358 7.5-7.5s-3.358-7.5-7.5-7.5z" />{" "}
                <path d="M79,375h192c4.142,0,7.5-3.358,7.5-7.5s-3.358-7.5-7.5-7.5H79c-4.142,0-7.5,3.358-7.5,7.5S74.858,375,79,375z" />{" "}
                <path d="m335,360h-32c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5 7.5,7.5h32c4.142,0 7.5-3.358 7.5-7.5s-3.358-7.5-7.5-7.5z" />{" "}
                <path d="M79,247h104c4.142,0,7.5-3.358,7.5-7.5s-3.358-7.5-7.5-7.5H79c-4.142,0-7.5,3.358-7.5,7.5S74.858,247,79,247z" />{" "}
                <path d="m335,232h-120c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5 7.5,7.5h120c4.142,0 7.5-3.358 7.5-7.5s-3.358-7.5-7.5-7.5z" />{" "}
                <path d="M79,279h168c4.142,0,7.5-3.358,7.5-7.5s-3.358-7.5-7.5-7.5H79c-4.142,0-7.5,3.358-7.5,7.5S74.858,279,79,279z" />{" "}
                <path d="m335,264h-56c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5 7.5,7.5h56c4.142,0 7.5-3.358 7.5-7.5s-3.358-7.5-7.5-7.5z" />{" "}
              </g>{" "}
            </svg>
          </div>
          <p className="text-3xl font-medium text-center text-gray-900 dark:text-white">
            Documentation
          </p>
          <p className="text-center text-gray-600 dark:text-gray-300">
            This project is completely open source. Explore the documentation,
            contribute improvements, or follow ongoing development on GitHub to
            see what's next.
          </p>
        </div>
        <div className="rounded-xl justify-center items-center mx-auto py-24 bg-white dark:bg-gray-800 p-10 border border-gray-300 dark:border-gray-700 flex flex-col gap-4 max-w-[30rem]">
          <div className="w-16 h-16 bg-white dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300 p-3 border border-gray-300 dark:border-gray-600">
            <svg
              className="w-full h-full"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              id="Windframe_9e5ZmRN34"
            >
              {" "}
              <path
                d="M10 16H7C4.79086 16 3 14.2091 3 12V12C3 9.79086 4.79086 8 7 8H10"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              />{" "}
              <path
                d="M16 12H8"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              />{" "}
              <path
                d="M14 16H17C19.2091 16 21 14.2091 21 12V12C21 9.79086 19.2091 8 17 8H14"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              />{" "}
            </svg>
          </div>
          <p className="text-3xl font-medium text-center text-gray-900 dark:text-white">
            Smart Sharing
          </p>
          <p className="text-center text-gray-600 dark:text-gray-300">
            Generate unique, secure links with passwords, giving you full control over who has access.
          </p>
        </div>
        <div className="rounded-xl justify-center items-center mx-auto py-24 bg-white dark:bg-gray-800 p-10 border border-gray-300 dark:border-gray-700 flex flex-col gap-4 max-w-[30rem]">
          <div className="w-16 h-16 bg-white dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300 p-3 border border-gray-300 dark:border-gray-600">
            <svg
              fill="currentColor"
              className="w-full h-full"
              viewBox="0 0 36 36"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              id="Windframe_VHw1vQrXk"
            >
              {" "}
              <rect
                className="clr-i-outline clr-i-outline-path-1"
                x="6"
                y="22"
                width="24"
                height="2"
              />{" "}
              <path
                className="clr-i-outline clr-i-outline-path-2"
                d="M30.84,13.37A1.94,1.94,0,0,0,28.93,12H26.55a3,3,0,0,1-.14,2h2.54C30,16.94,31.72,21.65,32,22.48V30H4V22.48C4.28,21.65,7.05,14,7.05,14H9.58a3,3,0,0,1-.14-2H7.07a1.92,1.92,0,0,0-1.9,1.32C2,22,2,22.1,2,22.33V30a2,2,0,0,0,2,2H32a2,2,0,0,0,2-2V22.33C34,22.1,34,22,30.84,13.37Z"
              />{" "}
              <path
                className="clr-i-outline clr-i-outline-path-3"
                d="M18,19.84l6.38-6.35A1,1,0,1,0,23,12.08L19,16V4a1,1,0,1,0-2,0V16l-4-3.95a1,1,0,0,0-1.41,1.42Z"
              />{" "}
              <rect x="0" y="0" width="36" height="36" fillOpacity="0" />{" "}
            </svg>
          </div>
          <p className="text-3xl font-medium text-center text-gray-900 dark:text-white">
            Direct Uploads
          </p>
          <p className="text-center text-gray-600 dark:text-gray-300">
            Files are uploaded directly to the connected storage platforms. The
            application functions only as a secure bridge and does not store or
            process your data.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
