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
  const queryKey = ["lists", queryParams.page, queryParams.pageSize, queryParams.teamId];

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
          <QuickActionsSection 
            teamId={teamId}
          allowCreateTeam={false}
          />
          <TeamMembersSection teamId={teamId!} />
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
