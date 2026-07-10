import { movieDatailQuery } from "@/entities/movie";
import type { QueryClient } from "@tanstack/react-query";
import type { LoaderFunctionArgs } from "react-router";

export const movieDetailLoader = (queryClient: QueryClient) => {
    return async ({ params }: LoaderFunctionArgs) => {
        const movieId = Number(params.movieId);
        return queryClient.ensureQueryData(movieDatailQuery(movieId));
    };
};