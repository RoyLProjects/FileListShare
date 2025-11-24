import React from "react";
import "./index.css";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeaderSection from "./layout/HeaderSection";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import FooterSection from "./layout/FooterSection";
import LandingPage from "./pages/LandingPage";
import ListPage from "./pages/ListPage";
import ListDetailPage from "./pages/ListDetailPage";

const qc = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={qc}>
      <BrowserRouter>
        <HeaderSection />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard/*" element={<ListPage />} />
          <Route path="/dashboard/:list/:listId" element={<ListDetailPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <FooterSection />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
);
//          //<Route path="/" element={<LandingPage />} />