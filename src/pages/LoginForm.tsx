import {
  Form,
  redirect,
  useActionData,
  useNavigation,
  type ActionFunctionArgs,
} from "react-router";
import { loginUser } from "../services/tmdbApi";

// 1. Екшен для обробки авторизації на стороні маршрутизатора
export async function loginAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const username = formData.get("username")?.toString();
  const password = formData.get("password")?.toString();

  // Проста валідація
  if (!username || !password) {
    return { error: "Будь ласка, заповніть усі поля" };
  }

  try {
    const sessionId = await loginUser(username, password);

    // Зберігаємо сесію у localStorage для подальших запитів
    localStorage.setItem("tmdb_session_id", sessionId);
    localStorage.setItem("username", username);

    return redirect("/");
  } catch (err: any) {
    // Якщо сервер повернув помилку, повертаємо її в компонент
    return { error: err.message || "Невірний логін або пароль" };
  }
}

// 2. Компонент сторінки Login
export default function Login() {
  // Отримуємо дані, які повернув екшен (якщо була помилка)
  const actionData = useActionData() as { error?: string } | undefined;

  // Отримуємо стан навігації для відстеження процесу відправки форми
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md border">
      <h2 className="text-2xl font-bold mb-6 text-center text-slate-800">
        Вхід у систему
      </h2>

      {actionData?.error && (
        <div className="bg-red-100 border border-red-400 text-red-700 p-3 rounded mb-4 text-sm text-center">
          {actionData.error}
        </div>
      )}

      <Form method="post" className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            name="username"
            type="text"
            required
            disabled={isSubmitting}
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Пароль
          </label>
          <input
            name="password"
            type="password"
            required
            disabled={isSubmitting}
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded font-semibold disabled:bg-slate-400 transition"
        >
          {isSubmitting ? "Вхід..." : "Увійти"}
        </button>
      </Form>
    </div>
  );
}
