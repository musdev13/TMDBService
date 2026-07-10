import { useForm } from "react-hook-form";
import { Button } from "@/shared/ui";
 
// Інтерфейс для даних форми
interface SearchFormValues {
  searchQuery: string;
}
 
interface SearchFormProps {
  onSearch: (query: string) => void;
  onClear: () => void;
  currentQuery: string;
}
 
export default function SearchForm({ onSearch, onClear, currentQuery }: SearchFormProps) {
  // Ініціалізуємо useForm з початковим значенням пошуку
  const { register, handleSubmit, reset } = useForm<SearchFormValues>({
    defaultValues: {
      searchQuery: currentQuery,
    },
  });
 
  // Обробник надсилання форми
  const onSubmit = (data: SearchFormValues) => {
    onSearch(data.searchQuery.trim());
  };
 
  // Функція очищення
  const handleClear = () => {
    reset({ searchQuery: "" }); // Скидаємо значення форми
    onClear();
  };
 
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex max-w-lg mx-auto gap-2 mb-8">
      <input
        type="text"
        {...register("searchQuery")} // Реєструємо інпут
        placeholder="Введіть назву фільму..."
        className="flex-1 px-4 py-2 border rounded-md outline-none focus:border-blue-500 transition"
      />
      {/* <button
        type="submit"
        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition"
      >
        Пошук
      </button> */}
      <Button type="submit">
        Пошук
      </Button>

      {currentQuery && (
        <Button type="button">Скинути</Button>
      )}
    </form>
  );
}
