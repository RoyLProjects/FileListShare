import React from "react";

const IntroductionSection: React.FC = () => {
  return (
    <section className="mx-auto px-4 py-20 md:py-32 max-w-screen-2xl">
      <div className="text-center mx-auto max-w-4xl">
        <p className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 dark:text-white">
          Smart File Requests Made Simple
        </p>
        <p className="mt-6 text-xl md:text-2xl text-gray-600 dark:text-gray-300">
          Streamline document collection with secure, shareable file request
          lists. Save time, stay organized, and collaborate effortlessly. Extend
          your file handling within the Dropbox ecosystem.
        </p>
        <div className="mt-10 sm:flex-row items-center justify-center flex flex-col gap-4">
          <a
            href="/login"
            className="w-full sm:w-auto bg-blue-600 dark:bg-blue-500 text-white font-semibold px-8 py-4 rounded-lg text-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
          >
            Get Started
        </a>
      </div>
    </div>
    {/* Image */}
     {/*  <div className="mt-12 rounded-xl shadow-xl overflow-hidden border border-gray-300 dark:border-gray-700 max-w-3xl mx-auto">
        <img
          alt="explainer how file requests work. first a user creates a file request list, then shares the link with others to collect files into their dropbox."
          src="/preview/intro-section.png"
          className="w-full h-auto"
        />
      </div> */}
    </section>
  );
};

export default IntroductionSection;
