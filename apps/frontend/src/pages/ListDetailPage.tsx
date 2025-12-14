import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Api } from "../apiClient/apiClient";
import ListDetailItem from "../components/ListDetailItem";
import CreateRequestPopup from "../components/CreateRequestPopup";
import TeamMembersSection from "../components/TeamMembersSection";
import ListQuickActionsSection from "../components/ListQuickActionsSection";
import { DeleteConfirmModal } from "../components/DeleteConfirm";

const uuidV4Regex =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const ListDetailPage: React.FC = () => {
  const { listId } = useParams<{ listId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const [isCreateRequestPopupOpen, setIsCreateRequestPopupOpen] =
    useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [pageSize, setPageSize] = useState(15);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (listId && !uuidV4Regex.test(listId)) {
      navigate("/dashboard", { replace: true });
    }
  }, [listId, navigate]);

  const queryParams = { listId: listId ?? "", page: page, pageSize: pageSize };

  const queryKey = [
    "listdetails",
    queryParams.listId,
    queryParams.page,
    queryParams.pageSize,
  ] as const;

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setPage(1);
  };

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
  const totalItemsCount = response?.data?.totalItems ?? 0;
  const title = response?.data?.title;
  const currentTeamId = response?.data?.teamId ?? "";
  const loading = isLoading || isFetching;

  const handleCreateRequest = () => {
    if (!listId) return;
    setIsCreateRequestPopupOpen(true);
  };

  const handleDeleteList = async () => {
    if (!listId) return;
    setIsDeleting(true);
    try {
      const { error } = await Api.DELETE("/v1/dashboard/list", {
        params: { query: { listId: listId } },
      });

      if (error) {
        console.error("Failed to delete list:", error);
        alert("Failed to delete list. Please try again.");
      } else {
        queryClient.invalidateQueries({ queryKey: ["lists"] });
        // Navigate back to dashboard
        if (currentTeamId) {
          navigate(`/dashboard/team/${currentTeamId}`, { replace: true });
        } else {
          navigate("/dashboard", { replace: true });
        }
      }
    } catch (error) {
      console.error("Failed to delete list:", error);
      alert("Failed to delete list. Please try again.");
    } finally {
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
    }
  };

  const totalItems = () => {
    if (!items) return 0;

    const totalitems = totalItemsCount;
    return totalitems;
  };

  const totalPages = () => {
    const size = pageSize || 1;
    const total = Math.ceil(totalItems() / size);
    return Math.max(1, total);
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
                  <>
                    {/* Mobile Headers */}
                    <div className="grid md:hidden grid-cols-7 gap-2 mb-3 pb-2 border-b border-neutral-200 dark:border-neutral-700">
                      <div className="col-span-1 shrink-0 min-w-10 text-sm font-semibold text-neutral-600 dark:text-neutral-400">
                        #
                      </div>
                      <div className="col-span-3 min-w-0 pl-2 text-sm font-semibold text-neutral-600 dark:text-neutral-400">
                        Description
                      </div>
                      <div className="col-span-2 text-sm font-semibold text-neutral-600 dark:text-neutral-400 text-center">
                        Delivery
                      </div>
                      <div className="col-span-1 text-sm font-semibold text-neutral-600 dark:text-neutral-400 text-right"></div>
                    </div>
                    {/* Desktop Headers */}
                    <div className="hidden md:grid grid-cols-15 gap-4 mb-3 pb-2 border-b border-neutral-200 dark:border-neutral-700">
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
                  </>
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
              {/* Pagination Section */}
              <section className="mt-6 flex items-center justify-between">
                <div className="text-sm text-neutral-600 dark:text-neutral-400">
                  Showing {(page - 1) * pageSize + 1} to{" "}
                  {Math.min(page * pageSize, totalItems())} of {totalItems()}{" "}
                  items
                </div>
                <div className="flex gap-2 items-center">
                  <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Items per page:
                  </label>
                  <select
                    value={pageSize}
                    onChange={(e) =>
                      handlePageSizeChange(Number(e.target.value))
                    }
                    className="px-3 py-1.5 text-sm font-medium text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value={15}>15</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={75}>75</option>
                    <option value={100}>100</option>
                  </select>
                </div>
                {totalPages() > 1 && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handlePageChange(page - 1)}
                      disabled={page === 1}
                      className="px-3 py-1.5 text-sm font-medium text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>

                    <div className="flex gap-1">
                      {Array.from(
                        { length: totalPages() },
                        (_, i) => i + 1,
                      ).map((p) => (
                        <button
                          key={p}
                          onClick={() => handlePageChange(p)}
                          className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                            page === p
                              ? "bg-blue-500 text-white"
                              : "text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => handlePageChange(page + 1)}
                      disabled={page === totalPages()}
                      className="px-3 py-1.5 text-sm font-medium text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                )}
              </section>
            </div>

            {/* Sidebar - Takes 1 column */}
            <div className="space-y-6">
              {listId && (
                <ListQuickActionsSection
                  listId={listId}
                  onCreateRequest={handleCreateRequest}
                  loading={loading}
                  teamId={currentTeamId || undefined}
                />
              )}
              {currentTeamId && (
                <>
                  <TeamMembersSection teamId={currentTeamId} />
                </>
              )}
              <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-6">
                <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                  Danger Zone
                </h3>
                <button
                  onClick={() => setIsDeleteModalOpen(true)}
                  className="w-full px-4 py-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors font-medium flex items-center justify-center gap-2"
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
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Delete List
                </button>
              </div>
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

      {title && (
        <DeleteConfirmModal
          open={isDeleteModalOpen}
          title="Delete List"
          entityLabel="list"
          entityName={title}
          isSaving={isDeleting}
          onConfirm={handleDeleteList}
          onCancel={() => setIsDeleteModalOpen(false)}
        />
      )}
    </>
  );
};

export default ListDetailPage;
