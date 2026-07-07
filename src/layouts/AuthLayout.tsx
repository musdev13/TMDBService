import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center p-6">
      <Outlet />
    </div>
  );
}
