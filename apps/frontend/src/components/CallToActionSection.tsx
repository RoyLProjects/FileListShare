import React from "react";

const CallToActionSection: React.FC = () => {
  return (
    <section className="bg-blue-600 dark:bg-blue-700 py-20">
      <div className="mx-auto px-4 text-center max-w-screen-xl">
        <p className="text-4xl md:text-5xl font-bold text-white mb-6">
          Ready to streamline your file requests?
        </p>
        <p className="text-xl text-blue-100 mb-10 mx-auto max-w-2xl">
          Join thousands of professionals who trust FileRequest to manage their
          document collection workflow.
        </p>
        <div className="sm:flex-row items-center justify-center flex flex-col gap-4">
          <a
            href="/O3hFoUQaK8R9yNGElZVC#"
            className="w-full sm:w-auto bg-white text-blue-600 font-semibold px-8 py-4 rounded-lg text-lg hover:bg-gray-100 transition-colors"
          >
            Start Free Trial
          </a>
          <a
            href="/O3hFoUQaK8R9yNGElZVC#"
            className="w-full sm:w-auto bg-blue-700 dark:bg-blue-800 text-white font-semibold px-8 py-4 rounded-lg text-lg border-2 border-white hover:bg-blue-800 dark:hover:bg-blue-900 transition-colors"
          >
            Schedule Demo
          </a>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
