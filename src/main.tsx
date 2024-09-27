import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "@radix-ui/themes/styles.css";
import { Spinner, Theme } from "@radix-ui/themes";
import { Toaster } from "react-hot-toast";

// TODO: Add Auth page, optional if user just wants to browse.
// TODO: Make URL/app/caseId pages.
// Reminder to make a Twitter image.
// TODO: Image upload in form.
// TODO: Incorporate database
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Spinner />}>
        <Theme>
          <App />
          <Toaster position="top-center" reverseOrder={false} />
        </Theme>
      </Suspense>
    ),
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
