import { getPopularMovies, searchMovies } from "../services/tmdbApi";
import MovieCard from "../components/MovieCard";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Pagination from "../components/Pagination";
import SearchForm from "../components/SearchForm";
import { Link, useSearchParams } from "react-router";

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
}

function App() {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("query") || "";
  const page = Number(searchParams.get("page")) || 1;

  const { data, isPending, isFetching, isError, error } = useQuery({
    queryKey: query ? ["movies", "search", query, page] : ["movies", page],
    queryFn: () => (query ? searchMovies(query, page) : getPopularMovies(page)),
    placeholderData: keepPreviousData,
    staleTime: 5000 * 60,
  });

  const handleSearch = (newQuery: string) => {
    setSearchParams({ query: newQuery, page: "1" });
  };

  const handleClear = () => {
    setSearchParams({});
  };

  const handlePageChange = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", String(newPage));
    setSearchParams(newParams);
  };

  const movies: Movie[] = data?.results || [];
  const totalPages = data?.total_pages || 1;

  return (
    <>
      <div className="container mx-auto py-8 px-8">
        <SearchForm
          onSearch={handleSearch}
          onClear={handleClear}
          currentQuery={query}
        />
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
              onPageChange={handlePageChange}
            />
            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {movies.map((movie) => (
                <Link key={movie.id} to={`/movie/${movie.id}`}>
                  <MovieCard movie={movie} />
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
