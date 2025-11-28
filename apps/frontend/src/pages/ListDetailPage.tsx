import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Api } from "../apiClient/apiClient";
import ListDetailItem from "../components/ListDetailItem";
import CreateRequestPopup from "../components/CreateRequestPopup";
import TeamMembersSection from "../components/TeamMembersSection";
import ListQuickActionsSection from "../components/ListQuickActionsSection";

const uuidV4Regex =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const ListDetailPage: React.FC = () => {
  const { listId } = useParams<{ listId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [isCreateRequestPopupOpen, setIsCreateRequestPopupOpen] =
    useState(false);

useEffect(() => {
  if (listId && !uuidV4Regex.test(listId)) {
    navigate("/dashboard", { replace: true });
  }
}, [listId, navigate]);

  const queryParams = { listId: listId ?? "", page: 1, pageSize: 15 };

  const queryKey = ["listdetails", queryParams.listId, queryParams.page, queryParams.pageSize] as const;

  const {
    data: response,
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey,
    queryFn: async () => {
      const { data, error } = await Api.GET("/v1/dashboard/listDetails", {
        params: { query: queryParams },
      });

      if (error) {
        // Important: make sure this *throws*
        throw error;
      }

      return data;
    },
    enabled: Boolean(listId),
    retry: 3,
    retryDelay: 500,
  });

useEffect(() => {
    if (error) {
      // optionally: check status code/type here
      navigate("/dashboard");
    }
  }, [error, navigate]);

  const items = response?.data?.items ?? [];
  const title = response?.data?.title;
  const currentTeamId = response?.data?.teamId ?? "";
  const loading = isLoading || isFetching;

  const handleCreateRequest = () => {
    if(!listId) return;
    setIsCreateRequestPopupOpen(true);
  };

  return (
    <>
  {loading === true && (
      <div className="mx-auto px-4 py-8 max-w-screen-2xl">
        <div className="text-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-neutral-600 dark:text-neutral-400">
            Loading list details...
          </p>
        </div>
      </div>
      )}

    {!response?.data && (
      <div className="mx-auto px-4 py-8 max-w-screen-2xl">
        <div className="text-center py-16">
          <p className="text-xl text-neutral-600 dark:text-neutral-400">
            List not found
          </p>
        </div>
      </div>
    )}
    {!loading && response?.data && (
    <div className="mx-auto px-4 py-8 max-w-screen-2xl">
      {/* Back Button */}
      <button
        onClick={() => {
          // Check if list belongs to a team and if we came from that team page
          const teamId = currentTeamId;
          const fromTeam = location.state?.fromTeam;

          if (
            teamId &&
            (fromTeam === teamId ||
              document.referrer.includes(`/team/${teamId}`))
          ) {
            // Navigate back to team page if we came from there
            navigate(`/dashboard/team/${teamId}`);
          } else {
            // Otherwise go to lists page
            navigate("/dashboard/lists");
          }
        }}
        className="mb-4 flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        <span className="font-medium">Back to Lists</span>
      </button>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
          {title}
        </h1>
      </div>

      {/* Main Content Grid */}
      <div className="lg:grid-cols-3 mb-8 grid grid-cols-1 gap-6">
        {/* List Items Section - Takes 2 columns */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-6">
            <h2 className="text-lg font-bold text-neutral-900 mb-4 dark:text-neutral-100">
              Requests
            </h2>

            {/* Column Headers */}
            {items?.length > 0 && (
              <div className="hidden lg:grid grid-cols-15 gap-4 mb-3 pb-2 border-b border-neutral-200 dark:border-neutral-700">
                <div className="col-span-1 shrink-0 min-w-10 text-sm font-semibold text-neutral-600 dark:text-neutral-400">
                  #
                </div>
                <div className="col-span-4 min-w-0 pl-8 text-sm font-semibold text-neutral-600 dark:text-neutral-400">
                  Description
                </div>
                <div className="col-span-2 text-sm font-semibold text-neutral-600 dark:text-neutral-400 text-center">
                  Uploads
                </div>
                <div className="col-span-2 text-sm font-semibold text-neutral-600 dark:text-neutral-400 text-center">
                  Status
                </div>
                <div className="col-span-2 text-sm font-semibold text-neutral-600 dark:text-neutral-400 text-center">
                  Delivery
                </div>
                <div className="col-span-2 text-sm font-semibold text-neutral-600 dark:text-neutral-400 text-center">
                  Requested by
                </div>
                <div className="col-span-1 text-sm font-semibold text-neutral-600 dark:text-neutral-400 text-right">
                  Deadline
                </div>
                <div className="col-span-1 text-sm font-semibold text-neutral-600 dark:text-neutral-400 text-right"></div>
              </div>
            )}

            {/* Loading State */}
            {loading && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                  Loading requests...
                </p>
              </div>
            )}

            {/* Empty State */}
            {!loading && items.length === 0 && (
              <div className="text-center py-8 text-neutral-600 dark:text-neutral-400">
                <p>No requests yet. Create your first request!</p>
              </div>
            )}

            {/* List Items */}
            {!loading && items.length > 0 && (
              <div className="space-y-3">
                {items.map((item) => (
                  <ListDetailItem
                    key={item.itemId}
                    item={item}
                    listId={listId!}
                    queryKey={queryKey}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar - Takes 1 column */}
        <div className="space-y-6">
          {listId && (
            <ListQuickActionsSection
              listId={listId}
              onCreateRequest={handleCreateRequest}
              loading={loading}
            />
          )}
          {currentTeamId && (
            <>
              <TeamMembersSection
                teamId={currentTeamId}
              />
            </>
          )}
          <button
            className="w-full py-2.5 px-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 font-medium rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
            onClick={() => navigate(`/dashboard/settings/${listId}`)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Settings
          </button>
        </div>
      </div>
    </div>
    )}
    {listId && (
        <CreateRequestPopup
          isOpen={isCreateRequestPopupOpen}
          onClose={() => setIsCreateRequestPopupOpen(false)}
          listId={listId}
          teamId={currentTeamId || undefined}
        />
      )}
    </>
  );
};

export default ListDetailPage;
