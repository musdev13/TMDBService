import { tmdbClient } from "@/shared/api";

export const getPopularMovies = async (page = 1) => {
  const response = await tmdbClient.get("/movie/popular", {
    params: {
      page,
    },
  });
  return response.data;
};

// https://api.themoviedb.org/3/movie/popular?language=uk-UA&page=1

export const searchMovies = async (query: string, page = 1) => {
  const response = await tmdbClient.get("/search/movie", {
    params: {
      query,
      page,
    },
  });
  return response.data;
};


export const getMovieDetails = async (movieId: number) => {
  const response = await tmdbClient.get(`/movie/${movieId}`, {
    params: {
      append_to_response: "credits,videos",
    },
  });
  return response.data;
};

export const movieDatailQuery = (movieId: number) => {
    return {
      queryKey: ["movie", movieId],
      queryFn: () => getMovieDetails(movieId),
      enabled: !!movieId, // Запит виконується лише якщо є id
      staleTime: 5 * 1000 * 60,
    };
  };