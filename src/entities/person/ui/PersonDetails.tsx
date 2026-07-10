import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getPersonDetails } from "../api/person";

export default function PersonDetails() {
    // Отримуємо movieId з URL
    const { personId } = useParams<{ personId: string }>();

    // Запит до TMDB API через React Query
    const {
        data: person,
        isPending,
        isError,
    } = useQuery({
        queryKey: ["movie", personId],
        queryFn: () => getPersonDetails(Number(personId)),
        enabled: !!personId, // Запит виконується лише якщо є id
        staleTime: 30 * 1000 * 10,
    });

    if (isPending)
        return <p className="text-center">Завантаження деталей актора...</p>;
    if (isError)
        return (
            <p className="text-center text-red-500">
                Помилка завантаження даних
            </p>
        );

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden md:flex p-6">
            <p>{person.name}</p>
        </div>
    );
}
