import React, { useState } from "react";
import LinkSharePopup from "./LinkSharePopup";

interface ListQuickActionsSectionProps {
  listId: string;
  onCreateRequest?: () => void;
}

const ListQuickActionsSection: React.FC<ListQuickActionsSectionProps> = ({
  listId,
  onCreateRequest,
}) => {
  const [isSharePopupOpen, setIsSharePopupOpen] = useState(false);

  return (
    <>
      <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-6">
        <p className="text-lg font-bold text-neutral-900 mb-4 dark:text-neutral-100">
          Quick Actions
        </p>
        <div className="space-y-3">
          <button
            type="button"
            onClick={onCreateRequest}
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
            <span>Create Request</span>
          </button>
          <button
            type="button"
            onClick={() => setIsSharePopupOpen(true)}
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
                d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
              />
            </svg>
            <span>Share Link</span>
          </button>
        </div>
      </div>

      {/* Share Link Popup */}
      <LinkSharePopup
        listId={listId}
        isOpen={isSharePopupOpen}
        onClose={() => setIsSharePopupOpen(false)}
      />
    </>
  );
};

export default ListQuickActionsSection;
