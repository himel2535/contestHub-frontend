import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { router } from "./routes/Routes.jsx";
import { RouterProvider } from "react-router";
import AuthProvider from "./providers/AuthProvider.jsx";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AosWrapper from "./AosWrapper.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <div>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AosWrapper>
          <RouterProvider router={router} />
          <Toaster position="top-right" reverseOrder={false} />
        </AosWrapper>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </div>
);
