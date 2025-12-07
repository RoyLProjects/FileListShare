import React, { useState } from "react";
import { authClient } from "../apiClient/authClient";
import { env } from "../env";

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDropboxLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await authClient.signIn.social(
        {
          provider: "dropbox",
          callbackURL: env.FRONTEND_URL + "/dashboard",
          newUserCallbackURL: env.FRONTEND_URL + "/dashboard/settings",
        },
        {
          onError: (ctx) => {
            setError(ctx.error.message);
          },
        },
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg mx-4 sm:mx-0">
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-2xl font-semibold mb-1">Sign in to Dropbox</h1>
          <p className="text-sm text-gray-500 text-center">
            Use your Dropbox account to continue.
          </p>
        </div>

        {error && (
          <div className="mb-4 text-sm text-red-700 bg-red-100 p-2 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleDropboxLogin} className="space-y-4">
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium text-white bg-[#0061FF] hover:bg-[#0051d6] disabled:opacity-60 disabled:cursor-not-allowed transition"
            disabled={loading}
          >
            {loading ? (
              "Connecting to Dropbox..."
            ) : (
              <>
                <span>Continue with Dropbox</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
