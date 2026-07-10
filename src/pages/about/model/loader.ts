import { redirect } from "react-router";
import { isSessionActive } from "@/entities/session";

export async function aboutLoader() {
  const isAuthenticated = isSessionActive();

  if (!isAuthenticated) {
    // Миттєво перенаправляємо без рендеру сторінки
    return redirect("/login");
  }

  return null;
}
