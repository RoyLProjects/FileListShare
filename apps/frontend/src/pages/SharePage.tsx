import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SharePageItem } from "../components/SharePageItem";
import { Api } from "../apiClient/apiClient";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { paths } from "@api-client/index";
import getErrorMessage from "../lib/GetErrorMessage";

type GetPublicItemsResponse =
  paths["/v1/public/items"]["get"]["responses"]["200"]["content"]["application/json"];

type PostAuthError =
  paths["/v1/public/auth"]["post"]["responses"]["400"]["content"]["application/json"];

type ApiItem = GetPublicItemsResponse["data"]["items"][number];

export type PublicListItem = ApiItem & {
  id: string;
};

const mapApiItemToPublicListItem = (item: ApiItem): PublicListItem => ({
  id: item.itemId,
  ...item,
});

const SharePage: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const queryClient = useQueryClient();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

const { data: sessionData, isLoading: isSessionLoading } = useQuery({
  queryKey: ["publicAuth", token],
  enabled: !!token,
  retry: false,
  queryFn: async () => {
    const { data, error } = await Api.GET("/v1/public/auth");

    if (error) throw error;
    return data;
  },
});

const isAuthenticated = sessionData?.success === true;

const {
  data: listData,
  isLoading: isItemsLoading,
  error: itemsQueryError,
} = useQuery({
  queryKey: ["publicItems", token],
  enabled: !!token && isAuthenticated,
  queryFn: async () => {
    if (!token) throw new Error("Missing token");

    const { data, error } = await Api.GET("/v1/public/items", {
      params: { query: { token } },
    });

    if (error) throw error;
  
    return data;
  },
});

const listDataBody = listData?.data || null;

const listTitle = listDataBody?.title || "";
const listId = listDataBody?.listId || null;
const items = listDataBody?.items.map(mapApiItemToPublicListItem) || [];

useEffect(() => {
  if(itemsQueryError) {
    setError(getErrorMessage(itemsQueryError) ?? "Failed to load list");
  } 
} , [itemsQueryError]);

const loading = isSessionLoading || isItemsLoading;

  const authMutation = useMutation({
    mutationKey: ["publicAuth", token],
    mutationFn: async (pwd: string) => {
      if (!token) throw new Error("Missing token");

      const { data, error } = await Api.POST("/v1/public/auth", {
        body: {
          token,
          password: pwd,
        },
      });
      if (error) throw error;

      return data;
    },
    onSuccess: (data) => {
      setError(null);
      queryClient.invalidateQueries({ queryKey: ["publicAuth", token] });
    },
    onError: (err) => {
      setError(getErrorMessage(err) || "Authentication failed");
    },
  });

  const authenticating = authMutation.isPending;

  const handleAuthenticate: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setError(null);
    authMutation.mutate(password);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-blue-600 dark:text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Password Required
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              This link is protected. Please enter the password to continue.
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleAuthenticate}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                placeholder="Enter password"
                disabled={authenticating}
                required
              />
            </div>

            <button
              type="submit"
              disabled={authenticating || !password}
              className="w-full px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {authenticating ? "Authenticating..." : "Continue"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-600 dark:text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {error}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Please check the link and try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {listTitle}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Shared file request list
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Requests ({items.length})
          </h2>

          {items.length === 0 ? (
            <div className="text-center py-12">
              <svg
                className="w-12 h-12 text-gray-400 dark:text-gray-600 mx-auto mb-4"
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
              <p className="text-gray-600 dark:text-gray-400">
                No requests in this list
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <SharePageItem
                  key={item.id}
                  item={item}
                  listId={listId}
                  token={token}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SharePage;
