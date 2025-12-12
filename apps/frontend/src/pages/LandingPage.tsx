
import IntroductionSection from "../components/IntroductionSection";
import FeaturesSection from "../components/FeaturesSection";
import CallToActionSection from "../components/CallToActionSection";
import { useAuth } from "../hooks/User";
import { useMemo } from "react";

const LandingPage: React.FC = () => {
const user = useAuth();

useMemo(() => {
    if (user.user) {
      window.location.href = "/dashboard";
    }
  }, [user]);

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
