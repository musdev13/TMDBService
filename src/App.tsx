import { useEffect } from "react";
import { useState } from "react";
import { getPopularMovies } from "./services/tmdbApi";
import MovieCard from "./components/MovieCard";

export interface Movie {
    id: number;
    title: string;
    poster_path: string;
    overview: string;
    release_date: string;
}

function App() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        getPopularMovies()
            .then((data) => {
                setMovies(data.results);
            })
            .catch((error) => {
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);
    return (
        <>
            <div className="container mx-auto py-8 px-8">
                <h1 className="font-bold text-center text-blue-600">
                    Популярні фільми
                </h1>
                {loading && (
                    <p className="text-center text-gray-500">Завантаження...</p>
                )}
                {error && <p className="text-center text-red-500">{error}</p>}
                {!loading && (
                    <div>
                        {movies.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

export default App;
