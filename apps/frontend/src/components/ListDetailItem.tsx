import React, { useState, useRef, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import EditRequestPopup from "./EditRequestPopup";
import { paths } from "@api-client/index";
import { Api } from "../apiClient/apiClient";

export type ListItemDetail =
  paths["/v1/dashboard/listDetails"]["get"]["responses"]["200"]["content"]["application/json"]["data"]["items"][number];
  export type response = paths["/v1/dashboard/listDetails"]["get"]["responses"]["200"]["content"]["application/json"];

export interface ListDetailItemProps {
  item: ListItemDetail;
  listId: string;
  queryKey: readonly [string, string, number, number];
  onUpdate?: () => void;
}

const ListDetailItem: React.FC<ListDetailItemProps> = ({
  item,
  listId,
  onUpdate,
  queryKey,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isTogglingDelivery, setIsTogglingDelivery] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleToggleDelivered = async () => {
    setIsTogglingDelivery(true);
    setIsMenuOpen(false);

    toggleDeliveredMutation.mutate(
      { listId, itemId: item.itemId ?? "", delivered: !item.delivered },
      {
        onSettled: () => setIsTogglingDelivery(false),
      }
    );
  };

  const queryClient = useQueryClient();

  const toggleDeliveredMutation = useMutation<
    unknown,
    unknown,
    { listId: string; itemId: string; delivered: boolean }
  >({
    mutationFn: async ({ listId, itemId, delivered }) => {
      const { data, error } = await Api.PATCH("/v1/dashboard/listDetails", {
        body: { listId, itemId, delivered },
      });
      if (error) throw error;
      return data;
    },
    onSuccess: (data, variables) => {
      queryClient.setQueryData(queryKey, (oldData: response) => {
        if (!oldData) return oldData;
        if(oldData.success && oldData.success === true) {
          const updatedItems = oldData.data.items.map((it: ListItemDetail) => {
            if (it.itemId === variables.itemId) {
              return { ...it, delivered: variables.delivered };
            }
            return it;
          });
          return { ...oldData, data: { ...oldData.data, items: updatedItems } };
        }
      });
      onUpdate?.();
    },
    onError: (err: unknown) => {
      console.error("Failed to update delivery status:", err);
    },
  });

    const toggleDeleteMutation = useMutation<
    unknown,
    unknown,
    { itemId: string }
  >({
    mutationFn: async ({ itemId }) => {
      const { data, error } = await Api.DELETE("/v1/dashboard/listDetails", {
        params: { query: { itemId } },
      });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKey });
      onUpdate?.();
    },
    onError: (err: unknown) => {
      console.error("Failed to delete item:", err);
    },
  });

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
  const getStatusStyles = () => {
    switch (item.status) {
      case "published":
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300";
      case "draft":
        return "bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300";
      default:
        return "bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300";
    }
  };

  const getDeliveryStyles = () => {
    if (item.delivered) {
      return "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300";
    }
    return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300";
  };

  const handleDeleteItem = async () => {
    if(!item.itemId) return;
    toggleDeleteMutation.mutate({ itemId: item.itemId });
  };

  const formatDeadline = (deadline: Date | null) => {
    if (!deadline) return "No deadline";

    const date = new Date(deadline);
    const now = new Date();

    // Set both dates to midnight for accurate day comparison
    date.setHours(0, 0, 0, 0);
    now.setHours(0, 0, 0, 0);

    const isOverdue = date < now && !item.delivered;

    const formatted = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    if (isOverdue) {
      return (
        <span className="text-red-600 dark:text-red-400 font-medium">
          {formatted} (Overdue)
        </span>
      );
    }

    return formatted;
  };

  return (
    <div className="bg-neutral-50 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:shadow-md transition-shadow">
      <div
        className="p-4 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="grid grid-cols-12 lg:grid-cols-15 gap-2 md:gap-4 items-center">
          {/* Item Number */}
          <div className="col-span-1 shrink-0 min-w-10">
            <div className="w-10 h-10 bg-white dark:bg-neutral-900 rounded-lg flex items-center justify-center border border-neutral-200 dark:border-neutral-700">
              <span className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
                #{item.itemnumber}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="col-span-4 min-w-0 pl-5">
            <p className="text-neutral-900 dark:text-neutral-100 font-medium wrap-break-word">
              {item.description}
            </p>
          </div>

          {/* Uploads */}
          <div className="col-span-2 text-center hidden md:block">
            <div className="flex items-center justify-center gap-2">
              <svg
                className="w-4 h-4 text-neutral-600 dark:text-neutral-400"
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
              <span className="text-sm text-neutral-700 dark:text-neutral-300">
                {item.uploadedFiles.length}{" "}
                {item.uploadedFiles.length === 1 ? "file" : "files"}
              </span>
            </div>
          </div>

          {/* Status */}
          <div className="col-span-3 md:col-span-2 text-center px-1">
            <span
              className={`px-2 md:px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap ${getStatusStyles()}`}
            >
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </span>
          </div>

          {/* Delivery Status */}
          <div className="col-span-3 md:col-span-2 text-center px-1">
            <span
              className={`px-2 md:px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap ${getDeliveryStyles()}`}
            >
              {item.delivered ? "Delivered" : "Pending"}
            </span>
          </div>

          {/* Created By */}
          <div className="col-span-2 text-center hidden lg:block">
            <p className="text-sm text-neutral-700 dark:text-neutral-300 truncate">
              {item.createdBy}
            </p>
          </div>

          {/* Deadline */}
          <div className="col-span-1 text-right hidden md:block">
            <p className="text-sm text-neutral-700 dark:text-neutral-300">
              {formatDeadline(item.deadline as Date | null)}
            </p>
          </div>

          {/* Menu Button */}
          <div className="col-span-1 flex justify-end">
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMenuOpen(!isMenuOpen);
                }}
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
                      onClick={() => {
                        setIsEditPopupOpen(true);
                        setIsMenuOpen(false);
                      }}
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
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                      Edit
                    </button>
                    <button
                      onClick={handleToggleDelivered}
                      disabled={isTogglingDelivery}
                      className="w-full text-left px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
                          d={
                            item.delivered
                              ? "M6 18L18 6M6 6l12 12"
                              : "M5 13l4 4L19 7"
                          }
                        />
                      </svg>
                      {item.delivered ? "Mark as Pending" : "Mark as Delivered"}
                    </button>
                    <button
                      onClick={() => {
                        handleDeleteItem();
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors flex items-center gap-2"
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
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="px-4 pb-4 pt-2 border-t border-neutral-200 dark:border-neutral-700">
          <div className="space-y-4">
            {/* Uploaded Files Section */}
            {item.uploadedFiles.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2 flex items-center gap-2">
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
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Uploaded Files ({item.uploadedFiles.length})
                </h4>
                <ul className="space-y-1">
                  {item.uploadedFiles.map((fileName, index) => (
                    <li
                      key={index}
                      className="text-sm text-neutral-600 dark:text-neutral-400 pl-6 flex items-center gap-2"
                    >
                      <svg
                        className="w-3 h-3 text-neutral-500 dark:text-neutral-500"
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
                      {fileName}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Comment Section */}
            {item.comment && (
              <div>
                <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2 flex items-center gap-2">
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
                      d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                    />
                  </svg>
                  Comment
                </h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 pl-6 whitespace-pre-wrap">
                  {item.comment}
                </p>
              </div>
            )}

            {/* Empty State */}
            {item.uploadedFiles.length === 0 && !item.comment && (
              <p className="text-sm text-neutral-500 dark:text-neutral-500 italic text-center py-2">
                No files uploaded and no comments yet
              </p>
            )}
          </div>
        </div>
      )}

      {/* Edit Request Popup */}
      <EditRequestPopup
        isOpen={isEditPopupOpen}
        onClose={() => setIsEditPopupOpen(false)}
        onSuccess={onUpdate}
        listId={listId}
        item={item}
      />
    </div>
  );
};

export default ListDetailItem;
