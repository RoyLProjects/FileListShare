// AppStatusContext.tsx
import React, { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { Api } from "../apiClient/apiClient";

type AppStatus = "ok" | "down";

type AppStatusContextValue = {
  status: AppStatus;
};

const AppStatusContext = createContext<AppStatusContextValue>({ status: "ok" });

export const useAppStatus = () => useContext(AppStatusContext);

export const AppStatusProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { error } = useQuery({
    queryKey: ["health"],
    queryFn: async () => {
      const { data, error } = await Api.GET("/v1/health");

      if (error) throw error;

      return data;
    },
    refetchInterval: 60_000,
    retry: 0,
  });

  const status: AppStatus = error ? "down" : "ok";

  return (
    <AppStatusContext.Provider value={{ status }}>
      {children}
    </AppStatusContext.Provider>
  );
};
