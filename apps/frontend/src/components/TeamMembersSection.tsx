import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Api } from "../apiClient/apiClient";

interface TeamMembersSectionProps {
  teamId: string;
}

const TeamMembersSection: React.FC<TeamMembersSectionProps> = ({ teamId }) => {
  if (!teamId) {
    return (
      <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-6">
        <p className="text-lg font-bold text-neutral-900 mb-4 dark:text-neutral-100">
          Team Members
        </p>
        <div className="text-center py-8 text-neutral-600 dark:text-neutral-400">
          <p>No team members found</p>
        </div>
      </div>
    );
  }

  // Query team list to resolve the team name (no single-team endpoint exists)
  const teamQueryParams = { page: 1, pageSize: 100 };
  const teamQueryKey = [
    teamQueryParams.page,
    teamQueryParams.pageSize,
  ];
  const {
    data: teamsResponse,
    isLoading: teamsLoading,
    isFetching: teamsFetching,
  } = useQuery({
    queryKey: teamQueryKey,
    enabled: !!teamId,
    queryFn: async () => {
      const { data, error } = await Api.GET("/v1/dashboard/team", {
        params: { query: teamQueryParams },
      });
      if (error) throw error;
      return data;
    },
  });

  const team =
    teamsResponse?.data?.items?.find(
      (t: { teamId: string }) => t.teamId === teamId,
    ) ?? undefined;
  const teamName = team?.title ?? "";
  const members = team?.members ?? [];
  const loading = teamsLoading || teamsFetching;

  const getInitials = (userId: string) => {
    // Extract initials from userId or use first 2 characters
    const parts = userId.split("@")[0].split(".");
    if (parts.length > 1) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return userId.substring(0, 2).toUpperCase();
  };

  const getDisplayName = (userId: string) => {
    // Format userId for display
    const emailPart = userId.split("@")[0];
    return emailPart
      .split(".")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-6">
      <p className="text-lg font-bold text-neutral-900 mb-4 dark:text-neutral-100">
        {teamName ? `Team: ${teamName}` : "Team Members"}
      </p>
      {loading ? (
        <div className="text-center py-8 text-neutral-600 dark:text-neutral-400">
          Loading...
        </div>
      ) : members.length > 0 ? (
        <div className="space-y-3">
          {members.map((member) => (
            <div
              key={member.userId}
              className="flex items-center gap-3 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
            >
              <div className="w-10 h-10 bg-blue-600 dark:bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                {getInitials(member.userId)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-neutral-900 dark:text-neutral-100 truncate">
                  {getDisplayName(member.userId)}
                </p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 truncate">
                  {member.userId}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-neutral-600 dark:text-neutral-400">
          <p>No team members found</p>
        </div>
      )}
    </div>
  );
};

export default TeamMembersSection;
