import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Вхід у систему
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Будь ласка, авторизуйтесь для доступу до Обраного
          </p>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
