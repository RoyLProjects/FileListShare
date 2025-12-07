import React from "react";
import IntroductionSection from "../components/IntroductionSection";
import FeaturesSection from "../components/FeaturesSection";
import CallToActionSection from "../components/CallToActionSection";

const LandingPage: React.FC = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <IntroductionSection />
      <FeaturesSection />
      {/*<WorkflowSection />*/}
      <CallToActionSection />
    </div>
  );
};

export default LandingPage;
