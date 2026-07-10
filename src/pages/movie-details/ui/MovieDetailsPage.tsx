import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { movieDatailQuery } from "@/entities/movie";

export function MovieDetailsPage() {
    const { movieId } = useParams<{ movieId: string }>();

    const {
        data: movie,
        isError,
        isPending,
    } = useQuery(movieDatailQuery(Number(movieId)));

    if (isPending)
        return <p className="text-center">Завантаження деталей фільму...</p>;
    if (isError)
        return (
            <p className="text-center text-red-500">
                Помилка завантаження даних
            </p>
        );

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden md:flex p-6">
            <img
                className="h-96 w-full object-cover md:w-64 rounded-md"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
            />
            <div className="p-8">
                <h1 className="block mt-1 text-2xl leading-tight font-bold text-black">
                    {movie.title}
                </h1>
                <p className="mt-2 text-gray-500">
                    {movie.release_date} • {movie.runtime} хв
                </p>
                <p className="mt-4 text-gray-700">{movie.overview}</p>
            </div>
        </div>
    );
}
