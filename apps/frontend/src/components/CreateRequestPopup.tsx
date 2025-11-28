import React, { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Api } from "../apiClient/apiClient";
import GetErrorMessage from "../lib/GetErrorMessage";
import { paths } from "@api-client/api.gen";

export interface CreateRequestPopupProps {
  onClose: () => void;
  onSuccess?: () => void;
  listId: string;
  teamId?: string;
  isOpen: boolean;
}

const CreateRequestPopup: React.FC<CreateRequestPopupProps> = ({
  onClose,
  onSuccess,
  listId,
  teamId,
  isOpen,
}) => {
  const [description, setDescription] = useState("");
  const [suggestedItemNumber, setSuggestedItemNumber] = useState<number | null>(null);
  
  const [status, setStatus] = useState<"published" | "draft">("published");
  const [deadline, setDeadline] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const queryClient = useQueryClient();

  type CreateItemBody = paths["/v1/dashboard/listDetails"]["post"]["requestBody"]["content"]["application/json"];

const queryParams = { listId: listId ?? "", page: 1, pageSize: 1 } as const;

    const fetchItemNumber = useMutation<number, unknown, void>({
    mutationFn: async () => {
      const { data, error } = await Api.GET("/v1/dashboard/listDetails", {
        params: { query: queryParams },
      });
      if (error) throw error;
      try {
        const payload = data as { data?: { items?: Array<{ itemnumber?: number }> } } | undefined;
        const firstItemNumber = payload?.data?.items?.[0]?.itemnumber;
        return (firstItemNumber ?? 0) + 1;
      } catch {
        return 1;
      }
    },
    onSuccess: (nextNumber: number) => {
      setSuggestedItemNumber(nextNumber);
    },
    onError: (err: unknown) => {
      setError(GetErrorMessage(err));
    },
  });


  const createMutation = useMutation<unknown, unknown, CreateItemBody>({
    mutationFn: async (itemData: CreateItemBody) => {
      const { data, error } = await Api.POST("/v1/dashboard/listDetails", { body: itemData });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listdetails"] });
      onSuccess?.();
      handleClose();
    },
    onError: (err: unknown) => {
      setError(GetErrorMessage(err));
    },
  });

  const loading =  isUpdating || fetchItemNumber.status === "pending" || createMutation.status === "pending";

  

  useEffect(() => {
    if (!isOpen) {
      setSuggestedItemNumber(null);
      return;
    }

    // Fetch suggestion when the popup opens so user sees suggested value.
    fetchItemNumber.mutateAsync().catch((err) => {
      setError(GetErrorMessage(err));
    });
  }, [isOpen]);

  const handleCreateRequest = async () => {
    const suggestion = await fetchItemNumber.mutateAsync();

    if (!description.trim()) {
      setError("Description is required");
      return;
    }

    const chosenNumber = suggestion;

    if (!Number.isInteger(chosenNumber) || chosenNumber < 1) {
      setError("Item number must be at least 1");
      return;
    }

    try {
      setIsUpdating(true);
      setError(null);

      const itemData = {
        listId,
        description: description.trim(),
        itemnumber: chosenNumber,
        status,
        ...(deadline ? { deadline: new Date(deadline).toISOString() } : {}),
        ...(teamId ? { teamId } : {}),
      };

      await createMutation.mutateAsync(itemData);

      // Reset form (handled in onSuccess too, but keep local reset)
      setDescription("");
      setStatus("published");
      setDeadline("");
    } catch (err) {
      console.error("Failed to create request:", err);
      setError(GetErrorMessage(err));
    } finally {
      setIsUpdating(false);
    }
  };

  const handleClose = () => {
    setDescription("");
    setStatus("published");
    setDeadline("");
    setError(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-xl max-w-md w-full p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
            Create New Request
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
          {/* Description Input */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter request description"
              rows={3}
              className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent resize-none"
              disabled={loading}
            />
          </div>

          {/* Item Number Input (optional) */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Item Number (optional)
            </label>
            <input
              type="text"
              value={suggestedItemNumber !== null ? String(suggestedItemNumber) : ""}
              readOnly
              placeholder={suggestedItemNumber === null ? "Loading..." : ""}
              className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
              disabled={loading}
            />
            {suggestedItemNumber !== null && (
              <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">
                Suggested: <span className="font-semibold">{suggestedItemNumber}</span>.
              </p>
            )}
          </div>

          {/* Status Selection */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Status
            </label>
            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value as "published" | "draft")
              }
              className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
              disabled={loading}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          {/* Deadline Input */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Deadline (optional)
            </label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
              disabled={loading}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <button
              onClick={handleCreateRequest}
                disabled={loading || !description.trim()}
              className="flex-1 px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {loading ? "Creating..." : "Create Request"}
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

export default CreateRequestPopup;
