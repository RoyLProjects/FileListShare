import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Api } from "../apiClient/apiClient";
import ListItem from "./ListItem";

interface ListsSectionProps {
  teamId?: string;
}

const ListsSection: React.FC<ListsSectionProps> = ({ teamId }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);

  const queryParams = teamId
    ? { page: currentPage, pageSize, teamId }
    : { page: currentPage, pageSize };

  const queryKey = teamId ? ["lists", queryParams.page, queryParams.pageSize, queryParams.teamId] as const : ["lists", queryParams.page, queryParams.pageSize] as const;

  const {
    data: response,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: queryKey,
    queryFn: async () => {
      const { data, error } = await Api.GET("/v1/dashboard/list", {
        query: queryParams,
      });

      if (error) throw error;

      return data;
    },
  });

  const listItems = response?.data?.Items ?? [];
  const listStats = response?.data?.stats ?? null;
  const loading = isLoading || isFetching;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1); // Reset to first page when page size changes
  };

  const totalItems = () => {
    if (!listStats) return 0;

    const totalitems = listStats.totalOfLists;
    return totalitems || 0;
  };

  const totalPages = () => {
    const size = pageSize || 1;
    const total = Math.ceil(totalItems() / size);
    return Math.max(1, total);
  };

  return (
    <div className="lg:col-span-2 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-6">
      <div className="items-center justify-between mb-6 flex">
        <p className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
          Lists
        </p>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-8 text-neutral-600 dark:text-neutral-400">
            Loading...
          </div>
        ) : listItems.length > 0 ? (
          listItems.map((list) => <ListItem key={list.id} list={list} />)
        ) : (
          <div className="text-center py-8 text-neutral-600 dark:text-neutral-400">
            No lists found
          </div>
        )}
      </div>

      {totalPages() > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-neutral-600 dark:text-neutral-400">
            Showing {(currentPage - 1) * pageSize + 1} to{" "}
            {Math.min(currentPage * pageSize, totalItems())} of {totalItems()}{" "}
            items
          </div>
          <div className="flex gap-2 items-center">
            <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Items per page:
            </label>
            <select
              value={pageSize}
              onChange={(e) => handlePageSizeChange(Number(e.target.value))}
              className="px-3 py-1.5 text-sm font-medium text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value={15}>15</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={75}>75</option>
              <option value={100}>100</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1.5 text-sm font-medium text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            <div className="flex gap-1">
              {Array.from({ length: totalPages() }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                      currentPage === page
                        ? "bg-blue-500 text-white"
                        : "text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}
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
    </div>
  );
};

export default ListsSection;
