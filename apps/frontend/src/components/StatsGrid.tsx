import React from "react";
import StatsCard from "./StatsCard";

interface StatsGridProps {
  totalLists: string | number;
  outstandingRequests: string | number;
  overdueItems: string | number;
  completedRequests: string | number;
}

const StatsGrid: React.FC<StatsGridProps> = ({
  totalLists,
  outstandingRequests,
  overdueItems,
  completedRequests,
}) => {
  return (
    <div className="md:grid-cols-2 lg:grid-cols-4 mb-8 grid grid-cols-1 gap-6">
      <StatsCard
        icon={
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
            ></path>
          </svg>
        }
        value={totalLists}
        label="Total Lists"
      />
      <StatsCard
        icon={
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
              d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            ></path>
          </svg>
        }
        value={outstandingRequests}
        label="Outstanding Requests"
      />
      <StatsCard
        icon={
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
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        }
        value={completedRequests}
        label="Completed Requests"
      />
      <StatsCard
        icon={
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
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            ></path>
          </svg>
        }
        value={overdueItems}
        label="Overdue Items"
      />
    </div>
  );
};

export default StatsGrid;
