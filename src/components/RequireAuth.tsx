import { Navigate, useLocation } from "react-router";
import React from "react";

interface RequireAuthProps {
  children: React.ReactNode;
}

export default function RequireAuth({ children }: RequireAuthProps) {
  const location = useLocation();

  // Імітуємо перевірку авторизації (наприклад, перевіряємо токен в localStorage)
  const isAuthenticated = !!localStorage.getItem("userToken");

  if (!isAuthenticated) {
    // Перенаправляємо на сторінку входу, зберігаючи попередній URL в state,
    // щоб після успішного входу повернути користувача назад.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
