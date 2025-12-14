import React, { useState } from "react";

type DeleteConfirmModalProps = {
  open: boolean;
  title?: string;
  entityLabel?: string;
  entityName: string;
  description?: React.ReactNode;
  confirmButtonLabel?: string;
  cancelButtonLabel?: string;
  isSaving?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  open,
  title = "Delete item",
  entityLabel = "item",
  entityName,
  description,
  confirmButtonLabel = "Delete",
  cancelButtonLabel = "Cancel",
  isSaving = false,
  onConfirm,
  onCancel,
}) => {
  const [confirmText, setConfirmText] = useState("");

  // Don't render anything if not open
  if (!open) return null;

  const isMatch = confirmText === entityName;

  const handleClose = () => {
    setConfirmText("");
    onCancel();
  };

  const handleConfirm = () => {
    if (!isMatch || isSaving) return;
    onConfirm();
  };

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/60 flex items-center justify-center z-60 p-4">
      <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-xl max-w-md w-full">
        <div className="p-4 border-b border-neutral-200 dark:border-neutral-700">
          <h3 className="text-lg font-semibold text-red-600 dark:text-red-400">
            {title}
          </h3>
        </div>

        <div className="p-4">
          {description ? (
            <div className="text-sm text-neutral-700 dark:text-neutral-300 mb-4">
              {description}
            </div>
          ) : (
            <p className="text-sm text-neutral-700 dark:text-neutral-300 mb-4">
              This action cannot be undone. This will permanently delete the{" "}
              {entityLabel}{" "}
              <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                {entityName}
              </span>{" "}
              and all of its related data.
            </p>
          )}

          <p className="text-sm text-neutral-700 dark:text-neutral-300 mb-2">
            Please type{" "}
            <span className="font-semibold text-neutral-900 dark:text-neutral-100">
              {entityName}
            </span>{" "}
            to confirm.
          </p>

          <input
            type="text"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder={`Type ${entityLabel} name to confirm`}
            className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 focus:border-transparent"
            disabled={isSaving}
          />
        </div>

        <div className="p-4 border-t border-neutral-200 dark:border-neutral-700 flex gap-2">
          <button
            onClick={handleConfirm}
            disabled={isSaving || !isMatch}
            className="flex-1 px-4 py-2 bg-red-600 dark:bg-red-500 text-white rounded-lg hover:bg-red-700 dark:hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {isSaving ? `${confirmButtonLabel}...` : confirmButtonLabel}
          </button>
          <button
            onClick={handleClose}
            disabled={isSaving}
            className="flex-1 px-4 py-2 bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 rounded-lg hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {cancelButtonLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
