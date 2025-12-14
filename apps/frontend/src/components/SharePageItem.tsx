import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Api } from "../apiClient/apiClient";
import type { paths } from "@api-client/index";
import getErrorMessage from "../lib/GetErrorMessage";

type UploadUrlResponse =
  paths["/v1/public/action/uploadUrl"]["post"]["responses"]["200"]["content"]["application/json"];

type UploadUrlError =
  paths["/v1/public/action/uploadUrl"]["post"]["responses"]["400"]["content"]["application/json"];

type AddUploadedFileError =
  paths["/v1/public/action/addUploadedFile"]["post"]["responses"]["400"]["content"]["application/json"];

type GetPublicItemsResponse =
  paths["/v1/public/items"]["get"]["responses"]["200"]["content"]["application/json"];

type ApiItem = GetPublicItemsResponse["data"]["items"][number];

export type PublicListItem = ApiItem & {
  id: string;
};

interface SharePageItemProps {
  item: PublicListItem;
  token: string | undefined;
  listId: string | null;
}

const MAX_FILE_SIZE = 150 * 1024 * 1024; // 150MB

export const SharePageItem: React.FC<SharePageItemProps> = ({
  item,
  token,
  listId,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [comment, setComment] = useState(item.comment || "");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>(
    {},
  );
  const queryClient = useQueryClient();
  const [actionError, setActionError] = useState<string | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  if (!token || !listId) {
    return null;
  }

  // itemId comes from API; id is just your UI helper
  const itemId = item.itemId;

  const markDeliveredMutation = useMutation({
    mutationKey: ["publicMarkDelivered", token, itemId],
    mutationFn: async (newDelivered: boolean) => {
      const { data, error } = await Api.POST(
        "/v1/public/action/markDelivered",
        {
          body: {
            token,
            itemId,
            delivered: newDelivered,
          },
        },
      );

      if (error) throw error;

      return data;
    },
    onMutate: () => {
      setActionError(null);
      setActionSuccess(null);
    },
    onSuccess: (_data, variables) => {
      queryClient.setQueryData(["publicItems", token], (oldData: any) => {
        const updatedDelivered = variables;
        if (!oldData) return oldData;
        if (oldData.success === true) {
          const updatedItems = oldData.data.items.map((item: ApiItem) => {
            if (item.itemId === itemId) {
              return {
                ...item,
                delivered: updatedDelivered,
              };
            }
            return item;
          });

          return {
            ...oldData,
            data: {
              ...oldData.data,
              items: updatedItems,
            },
          };
        }

        return oldData;
      });
    },
    onError: (err) => {
      setActionError(getErrorMessage(err) || "Failed to update item");
      console.error("Mark delivered error:", err);
      queryClient.invalidateQueries({ queryKey: ["publicAuth", token] });
    },
  });

  const addCommentMutation = useMutation({
    mutationKey: ["publicAddComment", token, itemId],
    mutationFn: async (newComment: string) => {
      const { data, error } = await Api.POST("/v1/public/action/addComment", {
        body: {
          token,
          itemId,
          comment: newComment,
        },
      });

      if (error) throw error;

      return data;
    },
    onMutate: () => {
      setActionError(null);
      setActionSuccess(null);
    },
    onSuccess: (_data, variables) => {
      queryClient.setQueryData(["publicItems", token], (oldData: any) => {
        const newComment = variables;
        if (!oldData) return oldData;
        if (oldData.success === true) {
          const updatedItems = oldData.data.items.map((item: ApiItem) => {
            if (item.itemId === itemId) {
              return {
                ...item,
                comment: newComment,
              };
            }
            return item;
          });

          return {
            ...oldData,
            data: {
              ...oldData.data,
              items: updatedItems,
            },
          };
        }

        return oldData;
      });
    },
    onError: (err) => {
      setActionError(getErrorMessage(err) || "Failed to add comment");
      console.error("Add comment error:", err);
      queryClient.invalidateQueries({ queryKey: ["publicAuth", token] });
    },
  });

  const actionLoading =
    markDeliveredMutation.isPending ||
    addCommentMutation.isPending ||
    uploading;

  const handleMarkDelivered = () => {
    const newDelivered = !item.delivered;
    markDeliveredMutation.mutate(newDelivered);
  };

  const handleAddComment = () => {
    const trimmed = comment.trim();
    if (!trimmed) return;
    if (trimmed === (item.comment || "").trim()) return;

    addCommentMutation.mutate(trimmed);
  };

  const handleCommentBlur = () => {
    handleAddComment();
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setActionError(null);
    setActionSuccess(null);

    const filesArray = Array.from(files);
    let successCount = 0;

    for (const file of filesArray) {
      if (file.size > MAX_FILE_SIZE) {
        setActionError(`File ${file.name} exceeds 150MB limit`);
        continue;
      }

      try {
        const { data, error } = await Api.POST("/v1/public/action/uploadUrl", {
          body: {
            token,
            listId,
            itemId,
            fileName: file.name,
            fileSize: file.size,
          },
        });

        if (error) {
          const errBody = (error as any).data as UploadUrlError | undefined;
          throw new Error(
            errBody?.message ?? `Failed to get upload URL for ${file.name}`,
          );
        }

        if (!data?.success) {
          throw new Error(`Failed to get upload URL for ${file.name}`);
        }

        const uploadData = (data as UploadUrlResponse).data;

        const uploadResponse = await fetch(uploadData.uploadUrl, {
          method: "POST",
          body: file,
          headers: {
            "Content-Type": "application/octet-stream",
          },
        });

        if (!uploadResponse.ok) {
          throw new Error(`Upload failed for ${file.name}`);
        }

        const { error: addFileError } = await Api.POST(
          "/v1/public/action/addUploadedFile",
          {
            body: {
              token,
              itemId,
              fileName: file.name,
            },
          },
        );

        if (addFileError) {
          const errBody = (addFileError as any).data as
            | AddUploadedFileError
            | undefined;
          throw new Error(
            errBody?.message ?? `Failed to register ${file.name}`,
          );
        }

        queryClient.setQueryData(["publicItems", token], (oldData: any) => {
          const newFile = file.name;
          if (!oldData) return oldData;
          if (oldData.success === true) {
            const updatedItems = oldData.data.items.map((item: ApiItem) => {
              if (item.itemId === itemId) {
                return {
                  ...item,
                  uploadedFiles: [...item.uploadedFiles, newFile],
                };
              }
              return item;
            });

            return {
              ...oldData,
              data: {
                ...oldData.data,
                items: updatedItems,
              },
            };
          }

          return oldData;
        });

        successCount++;
        setUploadProgress((prev) => ({ ...prev, [file.name]: 100 }));
      } catch (err) {
        console.error(`Upload error for ${file.name}:`, err);
        setActionError(
          err instanceof Error ? err.message : `Failed to upload ${file.name}`,
        );
      }
    }

    setUploading(false);

    if (successCount > 0) {
      setActionSuccess(
        `Successfully uploaded ${successCount} file${
          successCount > 1 ? "s" : ""
        }`,
      );
      setTimeout(() => {
        setActionSuccess(null);
        setUploadProgress({});
      }, 2000);
    }

    e.target.value = "";
  };

  // deadline comes from OpenAPI as {}, so we cast + narrow
  const deadline = item.deadline as string | null | undefined;
  const hasDeadline = !!deadline;
  const deadlineDate = deadline ? new Date(deadline) : null;

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      {/* Item Header */}
      <div
        className="p-4 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-3 flex-1">
            <span className="shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center font-semibold text-sm">
              {item.itemnumber}
            </span>
            <div className="flex-1">
              <h3 className="font-medium text-gray-900 dark:text-white">
                {item.description}
              </h3>
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mt-1">
                {item.createdBy && (
                  <span className="flex items-center gap-1">
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
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    {item.createdBy}
                  </span>
                )}
                {hasDeadline && deadlineDate && (
                  <span
                    className={`flex items-center gap-1 ${
                      deadlineDate < new Date() && !item.delivered
                        ? "text-red-600 dark:text-red-400 font-semibold"
                        : ""
                    }`}
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
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    {deadlineDate.toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`shrink-0 px-3 py-1 rounded-full text-xs font-medium ${
                item.delivered
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
              }`}
            >
              {item.delivered ? "Delivered" : "Pending"}
            </span>
            <svg
              className={`w-5 h-5 text-gray-400 transition-transform ${
                expanded ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {item.comment && !expanded && (
          <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              💬 {item.comment}
            </p>
          </div>
        )}

        {item.uploadedFiles.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Uploaded Files ({item.uploadedFiles.length})
            </h4>
            <div className="space-y-1">
              {item.uploadedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
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
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  {file}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Actions Panel */}
      {expanded && (
        <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-4">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
            Actions
          </h4>

          {/* Status Messages */}
          {actionError && (
            <div className="mb-3 p-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded text-sm">
              {actionError}
            </div>
          )}
          {actionSuccess && (
            <div className="mb-3 p-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded text-sm">
              {actionSuccess}
            </div>
          )}

          <div className="space-y-3">
            {/* Mark as Delivered */}
            <div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleMarkDelivered();
                }}
                disabled={actionLoading}
                className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${
                  item.delivered
                    ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-200 dark:hover:bg-yellow-800"
                    : "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-200 dark:hover:bg-green-800"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {actionLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Processing...
                  </span>
                ) : item.delivered ? (
                  "Mark as Pending"
                ) : (
                  "Mark as Delivered"
                )}
              </button>
            </div>

            {/* Add Comment */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Comment
              </label>
              <div className="flex gap-2">
                <div className="flex-1">
                  <textarea
                    value={comment}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value.length <= 1000) {
                        setComment(value);
                      }
                    }}
                    onBlur={handleCommentBlur}
                    onClick={(e) => e.stopPropagation()}
                    placeholder="Enter your comment..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent resize-none"
                    disabled={actionLoading}
                  />
                  <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 text-right">
                    {comment.length}/1000
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddComment();
                  }}
                  disabled={
                    actionLoading ||
                    !comment.trim() ||
                    comment.trim() === (item.comment || "").trim()
                  }
                  className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm self-start"
                >
                  Save
                </button>
              </div>
            </div>

            {/* Upload Files */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Upload Files
              </label>
              <div className="relative">
                <input
                  type="file"
                  multiple
                  onChange={handleFileSelect}
                  onClick={(e) => e.stopPropagation()}
                  disabled={uploading}
                  className="hidden"
                  id={`file-upload-${item.id}`}
                />
                <label
                  htmlFor={`file-upload-${item.id}`}
                  className={`block w-full px-4 py-2 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors ${
                    uploading
                      ? "border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                      : "border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400"
                  }`}
                >
                  {uploading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="animate-spin h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Uploading...
                    </span>
                  ) : (
                    <>
                      <svg
                        className="w-6 h-6 mx-auto mb-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <span className="text-sm">
                        Click to select files (max 150MB per file)
                      </span>
                    </>
                  )}
                </label>
              </div>

              {/* Upload Progress */}
              {Object.keys(uploadProgress).length > 0 && (
                <div className="mt-2 space-y-1">
                  {Object.entries(uploadProgress).map(
                    ([fileName, progress]) => (
                      <div
                        key={fileName}
                        className="text-xs text-gray-600 dark:text-gray-400"
                      >
                        {fileName}: {progress}%
                      </div>
                    ),
                  )}
                </div>
              )}

              {/* Already Uploaded Files */}
              {item.uploadedFiles.length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <h5 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Uploaded Files ({item.uploadedFiles.length})
                  </h5>
                  <div className="space-y-1">
                    {item.uploadedFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 rounded px-2 py-1"
                      >
                        <svg
                          className="w-3 h-3 shrink-0"
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
                        <span className="truncate">{file}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
