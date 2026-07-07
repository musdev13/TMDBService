import { useRouteError, isRouteErrorResponse, Link } from "react-router";

export default function ErrorPage() {
  const error = useRouteError();
  console.error("Помилка маршрутизатора:", error);

  let errorMessage = "Щось пішло не так. Спробуйте пізніше.";
  let errorStatus = 500;

  if (isRouteErrorResponse(error)) {
    // Помилки, створені через викидання Response об'єктів (наприклад, 404)
    errorStatus = error.status;
    if (error.status === 404) {
      errorMessage = "Ой! Сторінку не знайдено (404).";
    } else if (error.status === 401) {
      errorMessage = "Ви не авторизовані для перегляду цієї сторінки.";
    } else {
      errorMessage = error.data?.message || error.statusText;
    }
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-center items-center p-6 text-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full border border-red-100">
        <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-3xl font-bold mb-6 mx-auto">
          {errorStatus}
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Сталася помилка
        </h2>
        <p className="text-gray-600 mb-6">{errorMessage}</p>
        <Link
          to="/"
          className="inline-block px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
        >
          Повернутися на Головну
        </Link>
      </div>
    </div>
  );
}
