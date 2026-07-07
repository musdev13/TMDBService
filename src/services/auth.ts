import { redirect } from "react-router";

export async function aboutLoader() {
  const isAuthenticated = !!localStorage.getItem("userToken");

  if (!isAuthenticated) {
    // Миттєво перенаправляємо без рендеру сторінки
    return redirect("/login");
  }

  return null;
}
