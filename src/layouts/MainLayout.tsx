import { Outlet } from "react-router";
import { NavLink, Link } from "react-router";

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      {/* Шапка сайту */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 px-6 py-4 shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
          <Link
            to="/"
            className="text-2xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
          >
            TMDB Movies
          </Link>
          <nav className="flex gap-6 font-medium">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `transition duration-200 hover:text-blue-600 ${isActive ? "text-blue-600 border-b-2 border-blue-600 pb-1" : "text-gray-600"}`
              }
            >
              Головна
            </NavLink>
            <NavLink
              to="/movie"
              className={({ isActive }) =>
                `transition duration-200 hover:text-blue-600 ${isActive ? "text-blue-600 border-b-2 border-blue-600 pb-1" : "text-gray-600"}`
              }
            >
              Фільми
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `transition duration-200 hover:text-blue-600 ${isActive ? "text-blue-600 border-b-2 border-blue-600 pb-1" : "text-gray-600"}`
              }
            >
              Про нас
            </NavLink>
          </nav>
          <div>
            <Link
              className="px-5 py-3 rounded-2xl bg-lime-600 text-slate-800"
              to="/login"
            >
              Вхід
            </Link>
          </div>
        </div>
      </header>

      {/* Контент сторінки */}
      <main className="flex-1 container mx-auto py-8 px-6">
        <Outlet />
      </main>

      {/* Підвал сайту */}
      <footer className="bg-white border-t border-gray-200 py-6 text-center text-sm text-gray-500">
        <p>
          &copy; {new Date().getFullYear()} TMDB Movie Service. Всі права
          захищено.
        </p>
      </footer>
    </div>
  );
}
