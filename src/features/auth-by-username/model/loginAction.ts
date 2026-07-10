import {
  redirect,
  type ActionFunctionArgs,
} from "react-router";
import { loginUser } from "@/entities/session";


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