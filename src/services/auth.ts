import { redirect } from "react-router";

export async function aboutLoader() {
  const isAuthenticated = !!localStorage.getItem("tmdb_session_id");

  if (!isAuthenticated) {
    // Миттєво перенаправляємо без рендеру сторінки
    return redirect("/login");
  }

  return null;
}
