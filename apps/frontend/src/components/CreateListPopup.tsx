import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { Api } from "../apiClient/apiClient";
import GetErrorMessage from "../lib/GetErrorMessage";

export interface CreateListPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  teamId?: string | null;
}

const CreateListPopup: React.FC<CreateListPopupProps> = ({
  isOpen,
  onClose,
  onSuccess,
  teamId: initialTeamId,
}) => {
  const qc = useQueryClient();
  const [listName, setListName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [currentPage] = useState(1);
  const [pageSize] = useState(15);
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(
    initialTeamId ?? null,
  );

  const queryParams = { page: currentPage, pageSize: pageSize };
  const queryKey = ["teams", queryParams.page, queryParams.pageSize] as const;

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

  const allTeams = response?.data?.items || [];

  const createListMutation = useMutation<unknown, unknown, string>({
    mutationFn: async (name: string) => {
      const { data, error } = await Api.POST("/v1/dashboard/list", {
        body: {
          title: name,
          teamId: selectedTeamId || undefined,
        },
      });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["lists"] });
      onSuccess?.();
      handleClose();
    },
    onError: (err: unknown) => {
      setError(GetErrorMessage(err));
    },
  });
  const loading =
    isLoading || isFetching || createListMutation.status === "pending";

  const handleClose = () => {
    setListName("");
    setError(null);
    setSelectedTeamId(initialTeamId ?? null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-xl max-w-md w-full p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
            Create New List
          </h2>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded transition-colors"
          >
            <svg
              className="w-6 h-6 text-neutral-600 dark:text-neutral-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {/* List Name Input */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              List Name
            </label>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setError(null);
                const name = listName.trim();
                if (!name) return;
                try {
                  await createListMutation.mutateAsync(name);
                } catch (err) {
                  setError(GetErrorMessage(err));
                }
              }}
            >
              <input
                type="text"
                value={listName}
                onChange={(e) => setListName(e.target.value)}
                placeholder="Enter list name"
                className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                disabled={loading}
              />
            </form>
            <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
              List names must be unique
            </p>
          </div>

          {/* Team Selector (hidden when initial teamId prop is provided) */}
          {initialTeamId == null && (
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Team (optional)
              </label>
              <select
                value={selectedTeamId ?? ""}
                onChange={(e) => setSelectedTeamId(e.target.value || null)}
                disabled={loading}
                className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
              >
                <option value="">Personal</option>
                {allTeams.map((t) => (
                  <option key={t.teamId} value={t.teamId}>
                    {t.title ?? String(t.teamId)}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                Optionally associate this list with a team
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={async () => {
                const name = listName.trim();
                if (!name) return;
                setError(null);
                try {
                  await createListMutation.mutateAsync(name);
                } catch (err) {
                  setError(GetErrorMessage(err));
                }
              }}
              disabled={loading || !listName.trim()}
              className="flex-1 px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {loading ? "Creating..." : "Create List"}
            </button>
            <button
              onClick={handleClose}
              disabled={loading}
              className="flex-1 px-4 py-2 bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 rounded-lg hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateListPopup;
