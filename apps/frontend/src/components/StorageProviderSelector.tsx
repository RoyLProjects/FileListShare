import { useMutation } from "@tanstack/react-query";
import React, {  useState } from "react";
import { Api } from "../apiClient/apiClient";
import getErrorMessage from "../lib/GetErrorMessage";

export interface StorageProvider {
  id: string;
  name: string;
  type: "dropbox" | "onedrive" | "googledrive";
  icon: React.ReactNode;
  color: string;
  available: boolean;
}

export interface StorageProviderSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  teamId?: string;
  onSuccess?: () => void;
}

// Storage provider configurations
const STORAGE_PROVIDERS: StorageProvider[] = [
  {
    id: "dropbox",
    name: "Dropbox",
    type: "dropbox",
    color: "bg-blue-600",
    available: true,
    icon: (
      <svg
        className="w-8 h-8 text-white"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M6 1.807L0 5.629l6 3.822 6.001-3.822L6 1.807zM18 1.807l-6 3.822 6 3.822 6-3.822-6-3.822zM0 13.274l6 3.822 6.001-3.822L6 9.452l-6 3.822zM18 9.452l-6 3.822 6 3.822 6-3.822-6-3.822zM6 18.371l6.001 3.822 6-3.822-6-3.822L6 18.371z" />
      </svg>
    ),
  },
  // Future providers - commented out for now
  /*
  {
    id: "onedrive",
    name: "OneDrive",
    type: "onedrive",
    color: "bg-blue-700",
    available: false,
    icon: (
      <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.962 7.07a6.194 6.194 0 0 0-11.77 2.264 4.834 4.834 0 0 0 .847 9.602h9.808a5.153 5.153 0 0 0 1.115-10.17z" />
      </svg>
    ),
  },
  {
    id: "googledrive",
    name: "Google Drive",
    type: "googledrive",
    color: "bg-yellow-500",
    available: false,
    icon: (
      <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M7.71 3.5L1.15 15l3.4 5.5h13.9l-3.4-5.5z" opacity=".5"/>
        <path d="M7.71 3.5l6.29 10.5h6.84L14.55 3.5z"/>
        <path d="M1.15 15L7.71 3.5h6.84L8.26 14z" opacity=".75"/>
      </svg>
    ),
  },
  */
];

const StorageProviderSelector: React.FC<StorageProviderSelectorProps> = ({
  isOpen,
  onClose,
  teamId
}) => {
  const [error, setError] = useState<string | null>(null);

  const handleConnectProvider = useMutation<
  unknown,
  unknown,
  {teamId?: string}
>({
  mutationFn: async (teamId?) => {
    const { data, error } = await Api.GET("/v1/dashboard/dropbox/start", {
      params: {
        query: {
        teamId: teamId?.teamId
        }
      },
    });

    if (error) throw error;
    return data;
  },

  onSuccess: (_data: any, ) => {
    if(_data){
      window.location.href = _data.data.url;
    } else {
      setError("Failed to initiate Dropbox connection.");
    }
  },
  
  onError: (err: unknown) => {
    console.error("Failed to delete storage:", err);
    setError(getErrorMessage(err) || "Failed to delete storage");
  },
});

  const loading = false;
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-200 dark:border-neutral-700">
          <div>
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
              Select Storage Provider
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
              Connect a new storage provider to store your files
            </p>
          </div>
          <button
            onClick={onClose}
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

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400"></div>
            </div>
          ) : error ? (
            <div className="p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg text-sm">
              {error}
            </div>
          ) : (
            /* New Provider Selection */
            <div className="space-y-4">
              {/* Provider Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {STORAGE_PROVIDERS.map((provider) => (
                  <button
                    key={provider.id}
                    onClick={() =>
                      provider.available && (teamId ? handleConnectProvider.mutate({teamId}) : handleConnectProvider.mutate({}))
                    }
                    disabled={!provider.available}
                    className={`p-6 border rounded-lg transition-all ${
                      provider.available
                        ? "border-neutral-200 dark:border-neutral-700 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-lg cursor-pointer"
                        : "border-neutral-200 dark:border-neutral-700 opacity-50 cursor-not-allowed"
                    }`}
                  >
                    {/* Provider Icon */}
                    <div
                      className={`w-16 h-16 ${provider.color} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-md`}
                    >
                      {provider.icon}
                    </div>
                    {/* Provider Name */}
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                      {provider.name}
                    </h3>
                    {/* Status */}
                    {provider.available ? (
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        Click to connect
                      </p>
                    ) : (
                      <p className="text-sm text-amber-600 dark:text-amber-400 font-medium">
                        Coming Soon
                      </p>
                    )}
                  </button>
                ))}
              </div>
              {/* Info Box */}
              <div className="mt-6 p-4 bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-700 rounded-lg">
                <div className="flex gap-3">
                  <svg
                    className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div className="text-sm text-neutral-700 dark:text-neutral-300">
                    <p className="font-medium mb-1">About Storage Providers</p>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      {teamId
                        ? "Team storage is managed separately for each team."
                        : "Only your personal storage connections are available for personal use."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StorageProviderSelector;
