import React, { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ListItemDetail } from "./ListDetailItem";
import { Api } from "../apiClient/apiClient";
import GetErrorMessage from "../lib/GetErrorMessage";

export interface EditRequestPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  listId: string;
  item: ListItemDetail;
}

const EditRequestPopup: React.FC<EditRequestPopupProps> = ({
  isOpen,
  onClose,
  onSuccess,
  item,
}) => {
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"published" | "draft">("draft");
  const [delivered, setDelivered] = useState(false);
  const [deadline, setDeadline] = useState("");
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (isOpen && item) {
      setDescription(item.description);
      setStatus(item.status);
      setDelivered(item.delivered);

      // Convert deadline to date string format (YYYY-MM-DD)
      if (item.deadline) {
        const date = new Date(item.deadline as string);
        const dateString = date.toISOString().split("T")[0];
        setDeadline(dateString);
      } else {
        setDeadline("");
      }
    }
  }, [isOpen, item]);

  const updateListdetailMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await Api.PATCH("/v1/dashboard/listDetails", {
        body: {
          itemId: item.itemId ?? "",
          description: description,
          itemnumber: item.itemnumber,
          deadline: deadline || undefined,
          status: status,
          delivered: delivered,
        },
      });
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

  const handleClose = () => {
    setError(null);
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    updateListdetailMutation.mutate();
  };

  const mutationPending = (m: unknown) => {
    if (!m || typeof m !== "object") return false;
    const mm = m as Record<string, unknown>;
    const isLoadingFlag = mm["isLoading"] === true;
    const status = typeof mm["status"] === "string" ? String(mm["status"]) : "";
    return isLoadingFlag || status === "pending" || status === "loading";
  };
  const updating = mutationPending(updateListdetailMutation);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-xl max-w-md w-full p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
            Edit Request #{item.itemnumber}
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

        <form onSubmit={handleSubmit} className="space-y-4">
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
                disabled={updating}
            />
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
              disabled={updating}
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
              disabled={updating}
            />
          </div>

          {/* Delivered Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="delivered-edit"
              checked={delivered}
              onChange={(e) => setDelivered(e.target.checked)}
              className="w-4 h-4 text-blue-600 border-neutral-300 dark:border-neutral-600 rounded focus:ring-2 focus:ring-blue-500"
              disabled={updating}
            />
            <label
              htmlFor="delivered-edit"
              className="ml-2 text-sm font-medium text-neutral-700 dark:text-neutral-300"
            >
              Delivered
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <button
              type="submit"
              disabled={updating || !description.trim()}
              className="flex-1 px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {updating ? "Updating..." : "Update Request"}
            </button>
            <button
              onClick={handleClose}
              disabled={updating}
              className="flex-1 px-4 py-2 bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 rounded-lg hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRequestPopup;
