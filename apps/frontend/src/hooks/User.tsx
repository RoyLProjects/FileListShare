import { authClient } from "../apiClient/authClient";

// Create a local auth client and expose a small useAuth hook the app can use.
const { useSession } = authClient;

export function useAuth() {
  const { data: session, isPending: loading, error, refetch } = useSession();

  return {
    user: session?.user ?? null,
    loading: Boolean(loading),
    error,
    refetch,
  };
}

export default useAuth;
