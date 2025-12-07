import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Api } from "../apiClient/apiClient";
import { paths } from "@api-client/index";
import getErrorMessage from "../lib/GetErrorMessage";
import ConfirmModal from "../components/ConfirmModal";
import { DeleteConfirmModal } from "../components/DeleteConfirm";
import StorageProviderSelector from "../components/StorageProviderSelector";

const uuidV4Regex =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

type TeamMember =
  paths["/v1/dashboard/teammember"]["get"]["responses"]["200"]["content"]["application/json"]["data"]["items"][number];

const AVAILABLE_PERMISSIONS = [
  { value: "LIST_CREATE", label: "Create Lists" },
  { value: "LIST_RENAME", label: "Rename Lists" },
  { value: "LIST_DELETE", label: "Delete Lists" },
  { value: "ITEM_CREATE", label: "Create Items" },
  { value: "ITEM_UPDATE", label: "Update Items" },
  { value: "ITEM_DELETE", label: "Delete Items" },
  { value: "TEAM_RENAME", label: "Rename Team" },
  { value: "TEAM_DELETE", label: "Delete Team" },
  { value: "TEAM_MEMBER_CREATE", label: "Add Team Members" },
  { value: "TEAM_MEMBER_DELETE", label: "Remove Team Members" },
  { value: "TEAM_MEMBER_RIGHTS", label: "Manage Member Rights" },
  { value: "TEAM_STORAGE_ADD", label: "Add Storage" },
  { value: "TEAM_STORAGE_UPDATE", label: "Update Storage" },
  { value: "TEAM_STORAGE_DELETE", label: "Delete Storage" },
  { value: "TEAM_PUBLIC_LINK_CREATE", label: "Create Public Links" },
  { value: "TEAM_PUBLIC_LINK_DELETE", label: "Delete Public Links" },
];

type Permission =
  paths["/v1/dashboard/teammember"]["patch"]["requestBody"]["content"]["application/json"]["permissions"][number];
type team =
  paths["/v1/dashboard/team"]["get"]["responses"]["200"]["content"]["application/json"]["data"]["items"][number];

const TeamSettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { teamId } = useParams<{ teamId: string }>();
  const [showAddMember, setShowAddMember] = useState(false);
  const [newMemberUserId, setNewMemberUserId] = useState("");
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null);
  const [editingPermissions, setEditingPermissions] = useState<Permission[]>(
    [],
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [teamTitle, setTeamTitle] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState<TeamMember | null>(null);
  const [showStorageSelector, setShowStorageSelector] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (teamId && !uuidV4Regex.test(teamId)) {
      navigate(`/dashboard/team/${teamId}`, { replace: true });
    }
  }, [teamId, navigate]);

  const teamQueryParams = { teamId: teamId ?? "", page: 1, pageSize: 100 };
  const teamMemberQueryKey = [
    "teammembers",
    teamId,
    teamQueryParams.page,
    teamQueryParams.pageSize,
  ];

  const {
    data: teamMemberResponse,
    error: teamMembersError,
    isLoading: teamMembersLoading,
    isFetching: teamMembersFetching,
  } = useQuery({
    queryKey: teamMemberQueryKey,
    enabled: !!teamId,
    queryFn: async () => {
      const { data, error } = await Api.GET("/v1/dashboard/teammember", {
        params: { query: teamQueryParams },
      });
      if (error) throw error;
      return data;
    },
  });

  const members = teamMemberResponse?.data?.items as TeamMember[];
  const currentUserMember = members?.find((m) => m.currentMember === true);
  const teamQueryKey = [
    "team",
    teamId,
    teamQueryParams.page,
    teamQueryParams.pageSize,
  ];
  const {
    data: teamResponse,
    error: teamError,
    isLoading: teamLoading,
    isFetching: teamFetching,
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

  const storageQueryParams = { teamId: teamId ?? "" };
  const storageQueryKey = ["storage", teamId];

  const {
    data: storageResponse,
    error: storageError,
    isLoading: storageLoading,
    isFetching: storageFetching,
  } = useQuery({
    queryKey: storageQueryKey,
    enabled: !!teamId,
    queryFn: async () => {
      const { data, error } = await Api.GET("/v1/dashboard/storage", {
        params: { query: storageQueryParams },
      });
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
      if (teamError) {
        setErrorMessage(
          getErrorMessage(teamError) || "Failed to fetch team details",
        );
      } else if (teamMembersError) {
        setErrorMessage(
          getErrorMessage(teamMembersError) || "Failed to fetch team members",
        );
      } else if (storageError) {
        setErrorMessage(
          getErrorMessage(storageError) || "Failed to fetch storage details",
        );
      }
    }
  }, [teamMembersError, teamError, storageError]);

  const teams = teamResponse?.data;
  const teamDetail = teams?.items?.find((t) => t.teamId === teamId);

  useEffect(() => {
    if (teamDetail?.title) {
      setTeamTitle(teamDetail.title);
    }
  }, [teamDetail]);

  const getInitials = (userId: string) => {
    // Extract initials from userId or use first 2 characters
    const parts = userId.split("@")[0].split(".");
    if (parts.length > 1) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return userId.substring(0, 2).toUpperCase();
  };

  const handleEditMemberPermissions = (member: TeamMember) => {
    setEditingMemberId(member.userId);
    setEditingPermissions(member.permissions.map((p) => p.permission));
  };

  const togglePermission = (permission: string | Permission) => {
    const p = permission as Permission;
    setEditingPermissions((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p],
    );
  };

  const handleSaveTeamName = useMutation<
    unknown,
    unknown,
    { newTitle: string }
  >({
    mutationFn: async ({ newTitle }) => {
      const { data, error } = await Api.PATCH("/v1/dashboard/team", {
        body: {
          teamId: teamId!,
          title: newTitle,
        },
      });

      if (error) throw error;
      return data;
    },

    onSuccess: (_data, variables) => {
      const newTitle = variables.newTitle;
      queryClient.setQueryData(teamQueryKey, (oldData: any) => {
        if (!oldData) return oldData;
        if (oldData.success === true) {
          const updatedItems = oldData.data.items.map((m: team) => {
            if (m.teamId === teamId) {
              return {
                ...m,
                title: newTitle,
              };
            }
            return m;
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

      setEditingMemberId(null);
      setEditingPermissions([]);
    },

    onError: (err: unknown) => {
      console.error("Failed to save member permissions:", err);
      setErrorMessage(
        getErrorMessage(err) || "Failed to save member permissions",
      );
    },
  });
  const handleSaveMemberPermissions = useMutation<
    unknown,
    unknown,
    { member: TeamMember; newPermissions: Permission[] }
  >({
    mutationFn: async ({ member, newPermissions }) => {
      const { data, error } = await Api.PATCH("/v1/dashboard/teammember", {
        body: {
          teamId: teamId!,
          teamMemberId: member.teamMemberId,
          permissions: newPermissions,
        },
      });

      if (error) throw error;
      return data;
    },

    onSuccess: (_data, variables) => {
      const newPerms = variables.newPermissions;
      queryClient.setQueryData(teamMemberQueryKey, (oldData: any) => {
        if (!oldData) return oldData;

        if (oldData.success === true) {
          const updatedItems = oldData.data.items.map((m: TeamMember) => {
            if (m.teamMemberId === variables.member.teamMemberId) {
              return {
                ...m,
                permissions: newPerms.map((p) => ({ permission: p })),
              };
            }
            return m;
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

      setEditingMemberId(null);
      setEditingPermissions([]);
    },

    onError: (err: unknown) => {
      console.error("Failed to save member permissions:", err);
      setErrorMessage(
        getErrorMessage(err) || "Failed to save member permissions",
      );
    },
  });

  const handleRemoveMember = useMutation<
    unknown,
    unknown,
    { member: TeamMember }
  >({
    mutationFn: async ({ member }) => {
      const { data, error } = await Api.DELETE("/v1/dashboard/teammember", {
        params: {
          query: {
            teamId: teamId!,
            teamMemberId: member.teamMemberId,
          },
        },
      });

      if (error) throw error;
      return data;
    },

    onSuccess: (_data, variables) => {
      queryClient.setQueryData(teamQueryKey, (oldData: any) => {
        if (!oldData) return oldData;

        if (oldData.success === true) {
          const updatedItems = oldData.data.items.filter(
            (m: TeamMember) => m.teamMemberId !== variables.member.teamMemberId,
          );
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

    onError: (err: unknown) => {
      console.error("Failed to save member permissions:", err);
      setErrorMessage(
        getErrorMessage(err) || "Failed to save member permissions",
      );
    },
  });

  const handleDeleteTeam = useMutation<unknown, unknown>({
    mutationFn: async () => {
      const { data, error } = await Api.DELETE("/v1/dashboard/team", {
        params: {
          query: {
            teamId: teamId!,
          },
        },
      });

      if (error) throw error;
      return data;
    },

    onSuccess: () => {
      navigate(`/dashboard`, { replace: true });
    },

    onError: (err: unknown) => {
      console.error("Failed to delete team:", err);
      setErrorMessage(getErrorMessage(err) || "Failed to delete team");
    },
  });

  const handleAddNewMember = useMutation<unknown, unknown>({
    mutationFn: async () => {
      const { data, error } = await Api.POST("/v1/dashboard/teamInvite", {
        body: { teamId: teamId!, email: newMemberUserId },
      });

      if (error) throw error;

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: teamMemberQueryKey });
      setShowAddMember(false);
      setNewMemberUserId("");
    },
    onError: (err: unknown) => {
      console.error("Failed to add new member:", err);
      setErrorMessage(getErrorMessage(err) || "Failed to add new member");
    },
  });

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
    teamLoading ||
    teamFetching ||
    teamMembersLoading ||
    teamMembersFetching ||
    handleSaveMemberPermissions.isPending ||
    handleRemoveMember.isPending ||
    handleSaveTeamName.isPending ||
    handleDeleteTeam.isPending ||
    storageLoading ||
    storageFetching ||
    handleDeleteStorage.isPending;

  const canRenameTeam =
    currentUserMember?.permissions.some(
      (p) => p.permission === "TEAM_RENAME",
    ) ?? false;

  const canDeleteTeam =
    currentUserMember?.permissions.some(
      (p) => p.permission === "TEAM_DELETE",
    ) ?? false;

  const canManageMemberRights =
    currentUserMember?.permissions.some(
      (p) => p.permission === "TEAM_MEMBER_RIGHTS",
    ) ?? false;

  const canAddMembers =
    currentUserMember?.permissions.some(
      (p) => p.permission === "TEAM_MEMBER_CREATE",
    ) ?? false;

  const canRemoveMembers =
    currentUserMember?.permissions.some(
      (p) => p.permission === "TEAM_MEMBER_DELETE",
    ) ?? false;

  const canAddStorage =
    currentUserMember?.permissions.some(
      (p) => p.permission === "TEAM_STORAGE_ADD",
    ) ?? false;

  const canDeleteStorage =
    currentUserMember?.permissions.some(
      (p) => p.permission === "TEAM_STORAGE_DELETE",
    ) ?? false;

  const canUpdateStorage =
    currentUserMember?.permissions.some(
      (p) => p.permission === "TEAM_STORAGE_UPDATE",
    ) ?? false;

  return (
    <div className="w-full flex justify-center px-4">
      <div className="w-full max-w-3xl space-y-10 py-10">
        {/* Back button*/}
        <button
          onClick={() => navigate(`/dashboard/team/${teamId}`)} // or navigate("/teams") etc
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
          {/* Team Name */}
          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">
              Team Settings
            </h2>

            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Team Name
            </label>

            <div className="flex gap-2">
              <input
                type="text"
                value={teamTitle}
                onChange={(e) => setTeamTitle(e.target.value)}
                placeholder="Enter team name"
                className="flex-1 px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                disabled={!canRenameTeam || loading}
              />

              <button
                onClick={() =>
                  handleSaveTeamName.mutate({ newTitle: teamTitle })
                }
                disabled={
                  !canRenameTeam ||
                  loading ||
                  !teamTitle.trim() ||
                  teamTitle === teamDetail?.title
                }
                className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </section>

          {/* Team Storage Section */}
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

                  {canDeleteStorage && (
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
                  )}
                </div>
              </div>
            ) : (
              <div className="p-4 border border-neutral-200 dark:border-neutral-700 rounded-xl bg-neutral-50 dark:bg-neutral-900/40 shadow-sm">
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  No storage provider configured.
                </p>
              </div>
            )}

            {canAddStorage && !teamStorage && (
              <button
                onClick={() => setShowStorageSelector(true)}
                className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 font-medium text-sm"
              >
                Connect Storage Provider
              </button>
            )}
          </section>

          {/* Members + Permissions */}
          <section className="space-y-4 pt-6 border-t border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-neutral-800 dark:text-neutral-200">
                Members & Permissions
              </h3>

              {canAddMembers && !showAddMember && (
                <button
                  onClick={() => setShowAddMember(true)}
                  className="px-3 py-1.5 text-sm bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600"
                >
                  Add Member
                </button>
              )}
            </div>

            {/* Add Member */}
            {showAddMember && (
              <div className="p-4 border border-blue-400 dark:border-blue-500 bg-blue-50 dark:bg-blue-900/20 rounded-xl shadow-sm space-y-3">
                <h4 className="text-sm font-medium text-neutral-900 dark:text-neutral-200">
                  Add New Member
                </h4>

                <div className="space-y-2">
                  <label className="text-xs text-neutral-700 dark:text-neutral-300">
                    User ID (email)
                  </label>
                  <input
                    type="email"
                    value={newMemberUserId}
                    onChange={(e) => setNewMemberUserId(e.target.value)}
                    placeholder="user@example.com"
                    className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-900"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button className="flex-1 px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg"
                    onClick={() => handleAddNewMember.mutate()}
                    disabled={!newMemberUserId.trim() || loading}
                  >
                    Add Member
                  </button>
                  <button
                    onClick={() => {
                      setShowAddMember(false);
                      setNewMemberUserId("");
                    }}
                    className="px-4 py-2 bg-neutral-200 dark:bg-neutral-700 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Member Cards */}
            <div className="space-y-4">
              {members?.map((member) => (
                <div
                  key={member.userId}
                  className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900/50 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-neutral-300 dark:bg-neutral-700 rounded-full flex items-center justify-center">
                        <span className="font-bold text-neutral-800 dark:text-neutral-200">
                          {getInitials(member.userId)}
                        </span>
                      </div>

                      <div>
                        <p className="font-medium text-neutral-900 dark:text-neutral-100">
                          {member.userId}
                        </p>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">
                          {member.permissions.length} permissions
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    {canManageMemberRights &&
                      editingMemberId !== member.userId && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditMemberPermissions(member)}
                            className="px-3 py-1.5 bg-blue-600 dark:bg-blue-500 text-white text-sm rounded-lg"
                          >
                            Edit
                          </button>

                          {(canRemoveMembers || member.currentMember) && (
                            <button
                              onClick={() => setMemberToRemove(member)}
                              className="px-3 py-1.5 bg-red-600 dark:bg-red-500 text-white text-sm rounded-lg"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      )}
                  </div>

                  {/* Permission edit mode */}
                  {editingMemberId === member.userId ? (
                    <div className="space-y-3 pt-3 border-t border-neutral-200 dark:border-neutral-700">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {AVAILABLE_PERMISSIONS.map((perm) => (
                          <label
                            key={perm.value}
                            className="flex items-center gap-2 p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={editingPermissions.includes(
                                perm.value as any,
                              )}
                              onChange={() =>
                                togglePermission(perm.value as any)
                              }
                            />
                            <span className="text-sm">{perm.label}</span>
                          </label>
                        ))}
                      </div>

                      <div className="flex gap-2 pt-2">
                        <button
                          onClick={() =>
                            handleSaveMemberPermissions.mutate({
                              member,
                              newPermissions: editingPermissions,
                            })
                          }
                          className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => {
                            setEditingMemberId(null);
                            setEditingPermissions([]);
                          }}
                          className="px-4 py-2 bg-neutral-200 dark:bg-neutral-700 rounded-lg"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-1">
                      {member.permissions
                        .slice()
                        .sort(
                          (a, b) =>
                            AVAILABLE_PERMISSIONS.findIndex(
                              (p) => p.value === a.permission,
                            ) -
                            AVAILABLE_PERMISSIONS.findIndex(
                              (p) => p.value === b.permission,
                            ),
                        )
                        .map((perm) => (
                          <span
                            key={perm.permission}
                            className="px-2 py-1 text-xs rounded bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                          >
                            {
                              AVAILABLE_PERMISSIONS.find(
                                (p) => p.value === perm.permission,
                              )?.label
                            }
                          </span>
                        ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {!canManageMemberRights && (
              <p className="text-xs text-amber-600 dark:text-amber-400">
                You don't have permission to manage member rights
              </p>
            )}
          </section>

          {/* Danger Zone */}
          <section className="pt-8 border-t border-neutral-300 dark:border-neutral-700">
            <h3 className="text-lg font-semibold text-red-600 dark:text-red-400">
              Danger Zone
            </h3>

            <div className="p-4 mt-3 border border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20 rounded-xl shadow-sm">
              <p className="text-sm mb-3 text-neutral-700 dark:text-neutral-300">
                Once you delete a team, it cannot be restored.
              </p>

              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="px-4 py-2 bg-red-600 dark:bg-red-500 text-white rounded-lg"
                disabled={!canDeleteTeam || loading}
              >
                Delete Team
              </button>
            </div>
          </section>

          {/* Modals */}
          <ConfirmModal
            isOpen={!!memberToRemove}
            title="Remove Member"
            message={
              <>
                Are you sure you want to remove{" "}
                <span className="font-medium">{memberToRemove?.userId}</span>{" "}
                from the team? This action cannot be undone.
              </>
            }
            confirmLabel="Yes, Remove"
            cancelLabel="No"
            danger
            isLoading={loading}
            onCancel={() => setMemberToRemove(null)}
            onConfirm={() => {
              if (memberToRemove) {
                handleRemoveMember.mutate({ member: memberToRemove });
                setMemberToRemove(null);
              }
            }}
          />
          <DeleteConfirmModal
            open={showDeleteConfirm}
            title="Delete Team"
            entityLabel="team"
            entityName={teamDetail?.title ?? ""}
            isSaving={loading}
            onConfirm={() => handleDeleteTeam.mutate()}
            onCancel={() => setShowDeleteConfirm(false)}
            confirmButtonLabel="Delete Team"
          />
          <StorageProviderSelector
            isOpen={showStorageSelector}
            onClose={() => setShowStorageSelector(false)}
            teamId={teamId}
            onSuccess={() => console.log("ToDO: Storage provider connected")}
          />
        </>
        {/* --- end JSX --- */}
      </div>
    </div>
  );
};

export default TeamSettingsPage;
