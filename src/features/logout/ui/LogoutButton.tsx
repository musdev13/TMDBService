import { useNavigate } from "react-router";
import { clearSessionData } from "../model/logout";
 
interface LogoutButtonProps {
  className?: string;
}
 
export function LogoutButton({ className }: LogoutButtonProps) {
  const navigate = useNavigate();
 
  const handleLogout = () => {
    clearSessionData();
    
    navigate("/login", { replace: true });
  };
 
  return (
    <button
      onClick={handleLogout}
      className={
        className ||
        "px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md transition duration-200"
      }
    >
      Вийти
    </button>
  );
}