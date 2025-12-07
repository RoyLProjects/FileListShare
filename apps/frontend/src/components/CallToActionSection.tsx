import React from "react";

const CallToActionSection: React.FC = () => {
  return (
    <section className="bg-blue-600 dark:bg-blue-700 py-20">
      <div className="mx-auto px-4 text-center max-w-screen-xl">
        <p className="text-4xl md:text-5xl font-bold text-white mb-6">
          Ready to streamline your file requests?
        </p>
        <p className="text-xl text-blue-100 mb-10 mx-auto max-w-2xl">
          Built for professionals who need an easy, organized way to collect
          documents
        </p>
        <div className="sm:flex-row items-center justify-center flex flex-col gap-4">
          <a
            href="/login"
            className="w-full sm:w-auto bg-white text-blue-600 font-semibold px-8 py-4 rounded-lg text-lg hover:bg-gray-100 transition-colors"
          >
            Start
          </a>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
