import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Api } from "../apiClient/apiClient";
import getErrorMessage from "../lib/GetErrorMessage";
import { DeleteConfirmModal } from "../components/DeleteConfirm";
import StorageProviderSelector from "../components/StorageProviderSelector";
import { useAuth } from "../hooks/User";

const UserSettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showStorageSelector, setShowStorageSelector] = useState(false);
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const storageQueryKey = ["storage"];

  const {
    data: storageResponse,
    error: storageError,
    isLoading: storageLoading,
    isFetching: storageFetching,
  } = useQuery({
    queryKey: storageQueryKey,
    queryFn: async () => {
      const { data, error } = await Api.GET("/v1/dashboard/storage");
      if (error) throw error;
      if (data.success == true && data.data.id == null) {
        return null;
      }
      return data;
    },
  });

  const teamStorage = storageResponse?.data;

  useEffect(() => {
    if (!loading) {
      if (storageError) {
        setErrorMessage(
          getErrorMessage(storageError) || "Failed to fetch storage details",
        );
      }
    }
  }, [storageError]);

  const handleDeleteStorage = useMutation<
    unknown,
    unknown,
    { storageId: string }
  >({
    mutationFn: async ({ storageId }) => {
      const { data, error } = await Api.DELETE("/v1/dashboard/storage", {
        params: {
          query: {
            storageId: storageId,
          },
        },
      });

      if (error) throw error;
      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: storageQueryKey });
    },

    onError: (err: unknown) => {
      console.error("Failed to delete storage:", err);
      setErrorMessage(getErrorMessage(err) || "Failed to delete storage");
    },
  });

  const loading =
    storageLoading || storageFetching || handleDeleteStorage.isPending;

  return (
    <div className="w-full flex justify-center px-4">
      <div className="w-full max-w-3xl space-y-10 py-10">
        {/* Back button*/}
        <button
          onClick={() => navigate(`/dashboard`)} // or navigate("/teams") etc
          className="flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </button>
        {errorMessage && (
          <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-700 text-sm font-medium text-red-700 dark:text-red-300">
            {errorMessage}
          </div>
        )}
        <>
          {/* Storage Section */}
          <section className="space-y-3 pt-6 border-t border-neutral-200 dark:border-neutral-700">
            <h3 className="text-lg font-medium text-neutral-800 dark:text-neutral-200">
              Storage Provider
            </h3>

            {teamStorage ? (
              <div className="p-4 border border-blue-300 dark:border-blue-500 rounded-xl bg-blue-50 dark:bg-blue-900/20 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-sm">
                    {/* Icon */}
                    {teamStorage.type === "dropbox" && (
                      <svg
                        className="w-7 h-7 text-blue-600"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M6 1.807L0 5.629l6 3.822 6.001-3.822L6 1.807zM18 1.807l-6 3.822 6 3.822 6-3.822-6-3.822zM0 13.274l6 3.822 6.001-3.822L6 9.452l-6 3.822zM18 9.452l-6 3.822 6 3.822 6-3.822-6-3.822zM6 18.371l6.001 3.822 6-3.822-6-3.822L6 18.371z"
                        />
                      </svg>
                    )}
                  </div>

                  <div className="flex-1">
                    <p className="font-medium text-neutral-900 dark:text-neutral-100">
                      {teamStorage.displayName}
                    </p>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400">
                      {teamStorage.storagePath || "No path configured"}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      handleDeleteStorage.mutate({
                        storageId: teamStorage.id!,
                      })
                    }
                    disabled={loading}
                    className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20 transition"
                  >
                    <svg
                      className="w-5 h-5 text-red-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-4 border border-neutral-200 dark:border-neutral-700 rounded-xl bg-neutral-50 dark:bg-neutral-900/40 shadow-sm">
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  No storage provider configured.
                </p>
              </div>
            )}

            {!teamStorage && (
              <button
                onClick={() => setShowStorageSelector(true)}
                className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 font-medium text-sm"
              >
                Connect Storage Provider
              </button>
            )}
          </section>

          {/* Danger Zone */}
          <section className="pt-8 border-t border-neutral-300 dark:border-neutral-700">
            <h3 className="text-lg font-semibold text-red-600 dark:text-red-400">
              Danger Zone
            </h3>

            <div className="p-4 mt-3 border border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20 rounded-xl shadow-sm">
              <p className="text-sm mb-3 text-neutral-700 dark:text-neutral-300">
                Once you delete your account, it cannot be restored.
              </p>

              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="px-4 py-2 bg-red-600 dark:bg-red-500 text-white rounded-lg"
                disabled={loading}
              >
                Delete Account
              </button>
            </div>
          </section>

          {/* Modals */}
          <DeleteConfirmModal
            open={showDeleteConfirm}
            title="Delete Account"
            entityLabel="account"
            entityName={user?.name || "user"}
            isSaving={loading}
            onConfirm={() => console.log("ToDO: Delete account")}
            onCancel={() => setShowDeleteConfirm(false)}
            confirmButtonLabel="Delete Account"
          />
          <StorageProviderSelector
            isOpen={showStorageSelector}
            onClose={() => setShowStorageSelector(false)}
            onSuccess={() => console.log("ToDO: Storage provider connected")}
          />
        </>
      </div>
    </div>
  );
};

export default UserSettingsPage;
