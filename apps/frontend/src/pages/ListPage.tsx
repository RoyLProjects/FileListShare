import React from "react";
import StatsGrid from "../components/StatsGrid";
import QuickActionsSection from "../components/QuickActionsSection";
import TeamsSection from "../components/TeamsSection";
import ListsSection from "../components/ListsSection";
import { useQuery } from "@tanstack/react-query";
import { Api } from "../apiClient/apiClient";

const ListsPage: React.FC = () => {

const queryParams =  { page: 1, pageSize: 15 };

const queryKey = ["lists", queryParams] as const;

  const {
    data: response,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: queryKey,
    queryFn: async () => {
      const { data, error } = await Api.GET("/v1/dashboard/list", {
        query: queryParams
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

      <div className="lg:grid-cols-3 mb-8 grid grid-cols-1 gap-6">
        <ListsSection  />
        <div className="space-y-6">
          <QuickActionsSection />
          <TeamsSection  />
        </div>
      </div>
    </div>
  );
};

export default ListsPage;
