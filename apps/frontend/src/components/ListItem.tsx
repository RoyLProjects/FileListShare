import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { paths } from "@api-client/api.gen";
import LinkSharePopup from "./LinkSharePopup";

type DashboardListResponse =
  paths["/v1/dashboard/list"]["get"]["responses"]["200"]["content"]["application/json"]["data"]["Items"][number];

const ListItem: React.FC<{ list: DashboardListResponse, teamId?: string }> = ({ list, teamId }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSharePopupOpen, setIsSharePopupOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Transform list data
  const allDelivered =
    list.stats?.totalItems === list.stats?.totalDeliveredItems;

  const title = list.title;
  const filesRequested = list.stats?.totalItems || 0;
  const team = list.teamName || "Personal";
  const status = (
    allDelivered && filesRequested > 0 ? "Completed" : "In Progress"
  ) as "Completed" | "In Progress" | "Pending";

  const overdueItems = list.stats?.totalOverdueItems || 0;
  // Get comments (if any items have comments)
  const commentsCount = list.stats?.totalComments || 0;

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleOpenList = () => {
    // Pass state to indicate we're coming from a team page (if applicable)
    navigate(`/dashboard/list/${list.id}`, {
      state: list.teamId ? { fromTeam: list.teamId } : undefined,
    });
    setIsMenuOpen(false);
  };

  const handleShareLink = () => {
    setIsSharePopupOpen(true);
    setIsMenuOpen(false);
  };

  const getStatusStyles = () => {
    switch (status) {
      case "Completed":
        return "bg-neutral-800 dark:bg-neutral-200 text-white dark:text-neutral-900";
      default:
        return "bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300";
    }
  };

  return (
    <div className="items-center justify-between bg-neutral-50 dark:bg-neutral-800 rounded-lg flex p-4 border border-neutral-200 dark:border-neutral-700 hover:shadow-md transition-shadow">
      <button
        onClick={handleOpenList}
        className="items-center flex space-x-4 flex-1 text-left hover:opacity-80 transition-opacity"
      >
        <div className="w-12 h-12 bg-white dark:bg-neutral-900 rounded-lg items-center justify-center flex border border-neutral-200 dark:border-neutral-700">
          <svg
            className="w-6 h-6 text-neutral-700 dark:text-neutral-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <div>
          <p className="font-semibold text-neutral-900 dark:text-neutral-100">
            {title}
          </p>
          <div className="flex items-center gap-2">
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {filesRequested} files requested • {team}
            </p>
            {commentsCount > 0 && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                  />
                </svg>
                {commentsCount} {commentsCount === 1 ? "comment" : "comments"}
              </span>
            )}
            {overdueItems > 0 && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300">
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                  />
                </svg>
                {overdueItems} overdue
              </span>
            )}
          </div>
        </div>
      </button>
      <div className="items-center flex space-x-3">
        <span
          className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusStyles()}`}
        >
          {status}
        </span>
        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors rounded-lg"
          >
            <svg
              className="w-5 h-5 text-neutral-600 dark:text-neutral-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 z-10">
              <div className="py-1">
                <button
                  onClick={handleOpenList}
                  className="w-full text-left px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors flex items-center gap-2"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                  </svg>
                  Open list
                </button>
                <button
                  onClick={handleShareLink}
                  className="w-full text-left px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors flex items-center gap-2"
                >
                  <svg
                    className="w-4 h-4"
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
                  Share Link
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Link Share Popup */}
      <LinkSharePopup
        listId={list.id}
        isOpen={isSharePopupOpen}
        onClose={() => setIsSharePopupOpen(false)}
        teamId={teamId}
      />
    </div>
  );
};

export default ListItem;
