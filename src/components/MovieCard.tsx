import type { Movie } from "../App";
interface MovieCardProps {
    movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
    const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

    return (
        <div className="border grid grid-cols-2 rounded-lg p-4 shadow-sm hover:shadow-md transition">
            {movie.poster_path ? (
                <img
                    src={`${imageBaseUrl}${movie.poster_path}`}
                    alt={movie.title}
                    className="rounded-md w-full h-[250px] object-cover"
                />
            ) : (
                <div className="rounded-md w-full h-[250px] bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
                    Немає фото
                </div>
            )}
            <div className="pl-4">
                <h2 className="text-lg font-bold">{movie.title}</h2>
                <p className="text-sm text-gray-600 line-clamp-5 mt-2">
                    {movie.overview || "Опис відсутній."}
                </p>
            </div>
        </div>
    );
}
