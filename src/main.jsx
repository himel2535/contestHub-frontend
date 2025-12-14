// src/main.jsx বা src/index.jsx (আপডেট করা কোড)

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
import { ThemeProvider } from "next-themes";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <div>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light">
        <AuthProvider>
          <AosWrapper>
            <RouterProvider router={router} />

            <Toaster
              position="top-right"
              reverseOrder={false}
              toastOptions={{
                style: {
                  border: "1px solid #eab308",
                  padding: "16px",
                  color: "#1f2937",
                },

                success: {
                  iconTheme: {
                    primary: "#eab308",
                    secondary: "#fef3c7",
                  },
                  style: {
                    background: "#fffbeb",
                    color: "#b45309",
                    border: "1px solid #fcd34d",
                  },
                },

                error: {},
              }}
            />
          </AosWrapper>
        </AuthProvider>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </div>
);
