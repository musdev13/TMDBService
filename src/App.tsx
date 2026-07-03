import { useEffect } from "react";
import { useState } from "react";
import { getPopularMovies } from "./services/tmdbApi";
import MovieCard from "./components/MovieCard";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Pagination from "./components/Pagination";

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
}

function App() {
  const [page, setPage] = useState<number>(1);

  const { data, isPending, isFetching, isError, error } = useQuery({
    queryKey: ["movies", page],
    queryFn: () => getPopularMovies(page),
    placeholderData: keepPreviousData,
    staleTime: 5000 * 60,
  });

  const movies: Movie[] = data?.results || [];
  const totalPages = data?.total_pages || 1;

  return (
    <>
      <div className="container mx-auto py-8 px-8">
        <h1 className="font-bold text-center text-blue-600">
          Популярні фільми
        </h1>
        {isPending && (
          <p className="text-center text-gray-500">Завантаження...</p>
        )}
        {isError && <p className="text-center text-red-500">{error.message}</p>}
        {isFetching && !isPending && (
          <div className="text-center text-sm text-blue-500 mb-4 animate-pulse">
            Оновлення даних...
          </div>
        )}
        {!isPending && (
          <>
            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
            <div className="mt-5">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
