import { useNavigate } from "react-router";

export default function LoginForm() {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Логіка автентифікації...

    // Перенаправлення користувача на головну сторінку
    navigate("/");

    // Або крок назад в історії:
    // navigate(-1);
  };

  return (
    <form onSubmit={handleLogin}>
      {/* Інпути */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded-md"
      >
        Увійти
      </button>
    </form>
  );
}
