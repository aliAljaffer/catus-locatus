import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "@radix-ui/themes/styles.css";
import { Spinner, Theme } from "@radix-ui/themes";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { APP_ROUTE } from "./utils/helpers.ts";
import Error from "./Error.tsx";

// TODO: Add Auth page, optional if user just wants to browse.
// Reminder to make a Twitter image.
// TODO: Image upload in form.

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: `${APP_ROUTE}/*`,
    element: (
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<Spinner />}>
          <Theme>
            <App />
            <Toaster position="top-center" reverseOrder={false} />
          </Theme>
        </Suspense>
      </QueryClientProvider>
    ),
    index: true,
  },
  {
    path: "/",
    element: <Navigate to={APP_ROUTE} />,
  },
  {
    path: "*",
    element: <Error />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
