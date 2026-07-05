import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createBrowserRouter, RouterProvider } from "react-router";
import { About } from "./pages/About.tsx";
import MainLayout from "./layouts/MainLayout.tsx";
import AuthLayout from "./layouts/AuthLayout.tsx";
import LoginForm from "./pages/LoginForm.tsx";
import Home from "./pages/Home.tsx";
import MovieDetails from "./pages/MovieDetails.tsx";
import PersonDetails from "./pages/PersonDetails.tsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/movie/:movieId/:actorId/",
        element: <MovieDetails />,
      },
      {
        path: "/person/:personId",
        element: <PersonDetails />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
  {
    path: "login",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <LoginForm />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
);
