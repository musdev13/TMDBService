import { createBrowserRouter } from "react-router";
import { AboutPage, aboutLoader } from "@/pages/about";
import MainLayout from "@/pages/layout/MainLayout.tsx";
import AuthLayout from "@/pages/layout/AuthLayout.tsx";
// import { LoginForm, loginAction } from "@/features/auth-by-username/";
import { LoginPage } from "@/pages/login/";
import { loginAction } from "@/features/auth-by-username";
import {HomePage} from "@/pages/home";
import {MovieDetailsPage, movieDetailLoader } from "@/pages/movie-details";
import PersonDetails from "@/entities/person/ui/PersonDetails.tsx";
import type { QueryClient } from "@tanstack/react-query";
import {ErrorPage} from "@/pages/error";

export const createRouter = (queryClient: QueryClient) =>
    createBrowserRouter([
        {
            path: "/",
            element: <MainLayout />,
            errorElement: <ErrorPage />,
            children: [
                {
                    index: true,
                    element: <HomePage />,
                },
                {
                    path: "/movie/:movieId",
                    element: <MovieDetailsPage />,
                    loader: movieDetailLoader(queryClient),
                },
                {
                    path: "/person/:personId",
                    element: <PersonDetails />,
                },
                {
                    path: "/about",
                    element: <AboutPage />,
                    loader: aboutLoader,
                },
            ],
        },
        {
            path: "/login",
            element: <AuthLayout />,
            children: [
                {
                    index: true,
                    element: <LoginPage />,
                    action: loginAction,
                },
            ],
        },
    ]);
