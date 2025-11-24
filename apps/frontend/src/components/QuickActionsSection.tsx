import React, { useState } from "react";
import CreateListPopup from "./CreateListPopup";
import CreateTeamPopup from "./CreateTeamPopup";

interface QuickActionsSectionProps {
  allowCreateList?: boolean;
  allowCreateTeam?: boolean;
}

const QuickActionsSection: React.FC<QuickActionsSectionProps> = ({
  allowCreateList = true,
  allowCreateTeam = true,
}) => {
  const [isListPopupOpen, setIsListPopupOpen] = useState(false);
  const [isTeamPopupOpen, setIsTeamPopupOpen] = useState(false);

  return (
    <>
      <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-6">
        <p className="text-lg font-bold text-neutral-900 mb-4 dark:text-neutral-100">
          Quick Actions
        </p>
        <div className="space-y-3">
          {allowCreateList && (
            <button
              type="button"
              onClick={() => setIsListPopupOpen(true)}
              className="dark:text-neutral-900 hover:bg-neutral-900 dark:hover:bg-neutral-100 transition-colors flex space-x-3 w-full px-4 py-3 text-left font-medium text-white bg-neutral-800 dark:bg-neutral-200 rounded-lg items-center"
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span>Create New List</span>
            </button>
          )}

          {allowCreateTeam && (
            <button
              type="button"
              onClick={() => setIsTeamPopupOpen(true)}
              className="dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors flex space-x-3 w-full px-4 py-3 text-left font-medium text-neutral-700 bg-neutral-100 dark:bg-neutral-800 rounded-lg items-center"
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span>Create Team</span>
            </button>
          )}
        </div>
      </div>

      {/* Popups */}
      {allowCreateList && (
        <CreateListPopup
          isOpen={isListPopupOpen}
          onClose={() => setIsListPopupOpen(false)}
          onSuccess={() => {
            // Optionally refresh the page or update state
            window.location.reload();
          }}
        />
      )}

      {allowCreateTeam && (
        <CreateTeamPopup
          isOpen={isTeamPopupOpen}
          onClose={() => setIsTeamPopupOpen(false)}
          onSuccess={() => {
            // Optionally refresh the page or update state
            window.location.reload();
          }}
        />
      )}
    </>
  );
};

export default QuickActionsSection;
