import React, { useEffect, useState, useRef } from "react";
import {
  useParams,
  useSearchParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { listApi, type ListDetail } from "@/api/endpoints/listApi";
import { listItemApi, type ListItemDetail } from "@/api/endpoints/listItemApi";
import TeamMembersSection from "@/components/TeamMembersSection";
import ListQuickActionsSection from "@/components/ListQuickActionsSection";
import ListDetailItem from "@/components/ListDetailItem";
import CreateRequestPopup from "@/components/CreateRequestPopup";
import ListSettingsPopup from "@/components/ListSettingsPopup";
import StorageConfigurationPopup from "@/components/StorageConfigurationPopup";
import StorageProviderSelector from "@/components/StorageProviderSelector";

interface TeamMember {
  id: string;
  userId: string;
  createdAt?: Date;
  createdBy?: string;
}

const ListDetailPage: React.FC = () => {
  const { listId } = useParams<{ listId: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [listDetail, setListDetail] = useState<ListDetail | null>(null);
  const [listItems, setListItems] = useState<ListItemDetail[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [teamName, setTeamName] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [itemsLoading, setItemsLoading] = useState<boolean>(false);
  const [isCreateRequestPopupOpen, setIsCreateRequestPopupOpen] =
    useState(false);
  const [isSettingsPopupOpen, setIsSettingsPopupOpen] = useState(false);
  const [isStorageConfigPopupOpen, setIsStorageConfigPopupOpen] =
    useState(false);
  const [configStorageId, setConfigStorageId] = useState<string | null>(null);
  const [isStorageProviderSelectorOpen, setIsStorageProviderSelectorOpen] =
    useState(false);
  const hasCheckedStorageRef = useRef(false);

  // Check for openSettings or configureStorage query parameters
  useEffect(() => {
    const shouldOpenSettings = searchParams.get("openSettings") === "true";
    const shouldConfigureStorage =
      searchParams.get("configureStorage") === "true";
    const storageId = searchParams.get("storageId");

    if (shouldConfigureStorage && storageId) {
      // Storage is now derived from user/team, no need to update list
      // Just open the configurator
      setConfigStorageId(storageId);
      setIsStorageConfigPopupOpen(true);
      // Mark that we've handled storage setup
      hasCheckedStorageRef.current = true;
      // Remove the query parameters after opening the popup
      searchParams.delete("configureStorage");
      searchParams.delete("storageId");
      setSearchParams(searchParams);
    } else if (shouldOpenSettings) {
      setIsSettingsPopupOpen(true);
      // Remove the query parameter after opening the popup
      searchParams.delete("openSettings");
      setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams, listId]);

  useEffect(() => {
    const fetchListDetails = async () => {
      if (!listId) return;

      try {
        setLoading(true);
        const listResponse = await listApi.getById(listId);
        setListDetail(listResponse.data);

        const team = listResponse.data.team;
        if (team) {
          setTeamMembers(team.members || []);
          setTeamName(team.title);
        }
      } catch (error) {
        console.error("Failed to fetch list details:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchListItems = async () => {
      if (!listId) return;

      try {
        setItemsLoading(true);
        const itemsResponse = await listItemApi.getAll(listId);
        setListItems(itemsResponse.data.items);
      } catch (error) {
        console.error("Failed to fetch list items:", error);
      } finally {
        setItemsLoading(false);
      }
    };

    fetchListDetails();
    fetchListItems();
  }, [listId]);

  const handleCreateRequest = () => {
    // Check if storage is configured (derived from user or team)
    const hasStorage = listDetail?.user?.storage || listDetail?.team?.storage;
    if (!hasStorage) {
      // Open storage provider selector to prompt storage setup
      setIsStorageProviderSelectorOpen(true);
      return;
    }
    setIsCreateRequestPopupOpen(true);
  };

  const handleCreateRequestSuccess = async () => {
    // Refresh the list items after creating a new request
    if (!listId) return;

    try {
      setItemsLoading(true);
      const itemsResponse = await listItemApi.getAll(listId);
      setListItems(itemsResponse.data.items);
    } catch (error) {
      console.error("Failed to refresh list items:", error);
    } finally {
      setItemsLoading(false);
    }
  };

  const handleSettingsSuccess = async () => {
    // Refresh both list details and items after settings changes
    if (!listId) return;

    try {
      setLoading(true);
      const listResponse = await listApi.getById(listId);
      setListDetail(listResponse.data);

      const team = listResponse.data.team;
      if (team) {
        setTeamMembers(team.members || []);
        setTeamName(team.title);
      }
    } catch (error) {
      console.error("Failed to refresh list details:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto px-4 py-8 max-w-screen-2xl">
        <div className="text-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-neutral-600 dark:text-neutral-400">
            Loading list details...
          </p>
        </div>
      </div>
    );
  }

  if (!listDetail) {
    return (
      <div className="mx-auto px-4 py-8 max-w-screen-2xl">
        <div className="text-center py-16">
          <p className="text-xl text-neutral-600 dark:text-neutral-400">
            List not found
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto px-4 py-8 max-w-screen-2xl">
      {/* Back Button */}
      <button
        onClick={() => {
          // Check if list belongs to a team and if we came from that team page
          const teamId = listDetail?.team?.id;
          const fromTeam = location.state?.fromTeam;

          if (
            teamId &&
            (fromTeam === teamId ||
              document.referrer.includes(`/team/${teamId}`))
          ) {
            // Navigate back to team page if we came from there
            navigate(`/team/${teamId}`);
          } else {
            // Otherwise go to lists page
            navigate("/lists");
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
          {listDetail.title}
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          Created on {new Date(listDetail.createdAt).toLocaleDateString()}
        </p>
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
            {listItems.length > 0 && (
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
            {itemsLoading && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                  Loading requests...
                </p>
              </div>
            )}

            {/* Empty State */}
            {!itemsLoading && listItems.length === 0 && (
              <div className="text-center py-8 text-neutral-600 dark:text-neutral-400">
                <p>No requests yet. Create your first request!</p>
              </div>
            )}

            {/* List Items */}
            {!itemsLoading && listItems.length > 0 && (
              <div className="space-y-3">
                {listItems.map((item) => (
                  <ListDetailItem
                    key={item.id}
                    item={item}
                    listId={listId!}
                    onUpdate={handleCreateRequestSuccess}
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
            />
          )}
          {teamName && (
            <>
              <TeamMembersSection
                members={teamMembers}
                loading={loading}
                teamName={teamName}
              />
            </>
          )}
          <button
            className="w-full py-2.5 px-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 font-medium rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
            onClick={() => setIsSettingsPopupOpen(true)}
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

      {/* Create Request Popup */}
      {listId && (
        <CreateRequestPopup
          isOpen={isCreateRequestPopupOpen}
          onClose={() => setIsCreateRequestPopupOpen(false)}
          onSuccess={handleCreateRequestSuccess}
          listId={listId}
          teamId={listDetail?.teamId || undefined}
        />
      )}

      {/* List Settings Popup */}
      {listId && (
        <ListSettingsPopup
          isOpen={isSettingsPopupOpen}
          onClose={() => setIsSettingsPopupOpen(false)}
          onSuccess={handleSettingsSuccess}
          listId={listId}
        />
      )}

      {/* Storage Configuration Popup */}
      {listId && configStorageId && (
        <StorageConfigurationPopup
          isOpen={isStorageConfigPopupOpen}
          onClose={() => {
            setIsStorageConfigPopupOpen(false);
            setConfigStorageId(null);
          }}
          listId={listId}
          storageId={configStorageId}
        />
      )}

      {/* Storage Provider Selector */}
      <StorageProviderSelector
        isOpen={isStorageProviderSelectorOpen}
        onClose={() => setIsStorageProviderSelectorOpen(false)}
        teamId={listDetail?.team?.id}
        onSuccess={async () => {
          setIsStorageProviderSelectorOpen(false);
          // Refresh list details to get the updated storage
          await handleSettingsSuccess();
        }}
      />
    </div>
  );
};

export default ListDetailPage;
