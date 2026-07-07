import { createBrowserRouter } from "react-router";
import { About } from "./pages/About.tsx";
import MainLayout from "./layouts/MainLayout.tsx";
import AuthLayout from "./layouts/AuthLayout.tsx";
import LoginForm from "./pages/LoginForm.tsx";
import Home from "./pages/Home.tsx";
import MovieDetails, { movieDetailLoader } from "./pages/MovieDetails.tsx";
import PersonDetails from "./pages/PersonDetails.tsx";
import type { QueryClient } from "@tanstack/react-query";

export const createRouter = (queryClient: QueryClient) =>
  createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/movie/:movieId",
          element: <MovieDetails />,
          loader: movieDetailLoader(queryClient),
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
