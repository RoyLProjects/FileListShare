

import { useAppStatus } from "../components/AppStatusContext";

const MaintenanceBanner: React.FC = () => {
  const { status } = useAppStatus();

  return (
    <div>
      {status === "down" && (
        <div className="w-full bg-red-100 text-red-800 text-center py-2 text-sm">
          Backend is currently unavailable. Some features may not work.
        </div>
      )}

    </div>
  );
};

export default MaintenanceBanner;