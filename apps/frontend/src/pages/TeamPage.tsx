import React, { useEffect, useState } from "react";
import StatsGrid from "../components/StatsGrid";
import QuickActionsSection from "../components/QuickActionsSection";
import ListsSection from "../components/ListsSection";
import { useQuery } from "@tanstack/react-query";
import { Api } from "../apiClient/apiClient";
import { useNavigate, useParams } from "react-router-dom";
import TeamMembersSection from "../components/TeamMembersSection";

const uuidV4Regex =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const TeamPage: React.FC = () => {
  const { teamId } = useParams<{ teamId: string }>();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);

  const navigate = useNavigate();

  useEffect(() => {
    if (teamId && !uuidV4Regex.test(teamId)) {
      navigate("/dashboard", { replace: true });
    }
  }, [teamId, navigate]);

  const queryParams = { page: currentPage, pageSize: pageSize, teamId: teamId };
  const queryKey = [
    "lists",
    queryParams.page,
    queryParams.pageSize,
    queryParams.teamId,
  ];

  const {
    data: response,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: queryKey,
    queryFn: async () => {
      const { data, error } = await Api.GET("/v1/dashboard/list", {
        params: {
          query: queryParams,
        },
      });

      if (error) throw error;

      return data;
    },
  });

  const listStats = response?.data?.stats ?? null;
  const loading = isLoading || isFetching;

  const getTotalLists = () => {
    if (!listStats?.totalOfLists) return 0;
    return listStats.totalOfLists;
  };

  const getTotalOutstandingRequests = () => {
    if (!listStats?.totalOfItems) return 0;
    return listStats.totalOfItems;
  };

  const getTotalItemsWithUploads = () => {
    if (!listStats?.totalOfDeliveredItems) return 0;
    return listStats.totalOfDeliveredItems;
  };

  const getTotalOverdueItems = () => {
    if (!listStats?.totalOfOverdueItems) return 0;
    return listStats.totalOfOverdueItems;
  };

  return (
    <div className="mx-auto px-4 py-8 max-w-screen-2xl">
      <StatsGrid
        totalLists={loading ? 0 : getTotalLists()}
        outstandingRequests={loading ? 0 : getTotalOutstandingRequests()}
        overdueItems={loading ? 0 : getTotalOverdueItems()}
        completedRequests={loading ? 0 : getTotalItemsWithUploads()}
      />

      <button
        onClick={() => navigate("/dashboard")}
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
        <span className="font-medium">Back to all lists</span>
      </button>

      <div className="lg:grid-cols-3 mb-8 grid grid-cols-1 gap-6">
        <ListsSection
          teamId={teamId}
          currentPage={currentPage}
          pageSize={pageSize}
          setCurrentPage={setCurrentPage}
          setPageSize={setPageSize}
        />
        <div className="space-y-6">
          <QuickActionsSection teamId={teamId} allowCreateTeam={false} />
          <TeamMembersSection teamId={teamId!} />
          <button
            className="w-full py-2.5 px-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 font-medium rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
            onClick={() => navigate(`/dashboard/team/${teamId}/settings`)}
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
  );
};

export default TeamPage;
