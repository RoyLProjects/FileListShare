import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Api } from "../apiClient/apiClient";
import TeamItem from "./TeamItem";

const TeamsSection: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
const [pageSize] = useState(15);

const queryParams =  { page: currentPage, pageSize: pageSize };
const queryKey = ["teams", queryParams] as const;

  const {
      data: response,
      isLoading,
      isFetching,
    } = useQuery({
      queryKey: queryKey,
      queryFn: async () => {
        const { data, error } = await Api.GET("/v1/dashboard/team", {
          query: queryParams,
        });
  
        if (error) throw error; 
  
        return data;
      },
    });
    const loading = isLoading || isFetching;
    const allTeams = response?.data?.items || [];

  const totalItems = () => {
    if(!response?.data?.total) return 0;

    const totalitems = response?.data?.total;
    return totalitems || 0;
  }

const totalPages = () => {
  const size = pageSize || 1;  
  const total = Math.ceil(totalItems() / size);
  return Math.max(1, total);
};


  // Calculate paginated items

  const getInitials = (name: string) => {
    const words = name.split(" ");
    if (words.length > 1) {
      return words[0][0] + words[1][0];
    }
    return name.substring(0, 2);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-6">
      <p className="text-lg font-bold text-neutral-900 mb-4 dark:text-neutral-100">
        Teams
      </p>
      {loading ? (
        <div className="text-center py-8 text-neutral-600 dark:text-neutral-400">
          Loading...
        </div>
      ) : allTeams.length > 0 ? (
        <>
          <div className="space-y-3">
            {allTeams.map((team) => (
              <TeamItem
                key={team.teamId}
                teamId={team.teamId}
                initial={getInitials(team.title)}
                name={team.title}
                members={team.members?.length || 0}
              />
            ))}
          </div>

          {totalPages() > 1 && (
            <div className="mt-6 space-y-3">
              <div className="text-sm text-neutral-600 dark:text-neutral-400 text-center">
                Showing {(currentPage - 1) * pageSize + 1} to{" "}
                {Math.min(currentPage * pageSize,   totalItems())} of {totalItems()}{" "}
                teams
              </div>

              <div className="flex gap-2 justify-center">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 text-sm font-medium text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>

                <div className="flex gap-1">
                  {Array.from({ length: Math.min(totalPages(), 5) }, (_, i) => {
                    let pageNum;
                    if (totalPages() <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages() - 2) {
                      pageNum = totalPages() - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                          currentPage === pageNum
                            ? "bg-blue-500 text-white"
                            : "text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages()}
                  className="px-3 py-1.5 text-sm font-medium text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-8 text-neutral-600 dark:text-neutral-400">
          No teams found
        </div>
      )}
    </div>
  );
};

export default TeamsSection;
