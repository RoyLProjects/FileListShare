import React from "react";

const WorkflowSection: React.FC = () => {
  return (
    <section className="bg-white dark:bg-gray-800 py-20">
      <div className="mx-auto px-4 max-w-screen-2xl">
        <div className="md:grid-cols-2 items-center grid gap-12">
          <div>
            <p className="text-blue-600 mb-4 font-semibold tracking-wide text-sm dark:text-blue-400 uppercase">
              How It Works
            </p>
            <p className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6 dark:text-white">
              Simple workflow, powerful results
            </p>
            <p className="text-lg text-gray-600 mb-8 dark:text-gray-300">
              Our intuitive platform makes it easy to create, share, and manage
              file requests in just a few clicks. No technical expertise
              required.
            </p>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 text-blue-600 rounded-lg items-center justify-center font-bold text-xl flex-shrink-0 dark:text-blue-400 flex">
                  1
                </div>
                <div>
                  <p className="text-xl font-semibold text-gray-900 mb-2 dark:text-white">
                    Create Your List
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    Add the files you need with descriptions and requirements.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 text-blue-600 rounded-lg items-center justify-center font-bold text-xl flex-shrink-0 dark:text-blue-400 flex">
                  2
                </div>
                <div>
                  <p className="text-xl font-semibold text-gray-900 mb-2 dark:text-white">
                    Share Securely
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    Generate a secure link and send it to your clients.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 text-blue-600 rounded-lg items-center justify-center font-bold text-xl flex-shrink-0 dark:text-blue-400 flex">
                  3
                </div>
                <div>
                  <p className="text-xl font-semibold text-gray-900 mb-2 dark:text-white">
                    Track Progress
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    Monitor uploads.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-2xl shadow-xl overflow-hidden border border-gray-300 dark:border-gray-700">
            <img
              alt="How it works"
              src="https://placehold.co/600x700/e5e7eb/6b7280?text=Workflow+Illustration"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkflowSection;
