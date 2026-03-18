import { Link, useLocation } from "react-router-dom";
import { UserCircle, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.svg";

const navLinks = [
  { path: "/", label: "Calculadora" },
  { path: "/dashboard", label: "Dashboard" },
];

const Header = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      // silently fail
    }
  };

  if (!user) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        {/* Logo + Navigation */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex-shrink-0">
            <img src={logo} alt="JB Calc Logo" className="h-8 w-8" />
          </Link>
          <nav className="flex items-center gap-1">
            {navLinks.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  location.pathname === path
                    ? "bg-slate-800 text-white"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* User info */}
        <div className="flex items-center gap-3">
          <Link
            to={`/perfil/${user.id}`}
            className={`flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm transition-colors ${
              location.pathname.startsWith("/perfil")
                ? "bg-slate-800 text-white"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            }`}
            title="Meu perfil"
          >
            <UserCircle size={18} strokeWidth={1.5} />
            <span className="hidden sm:inline">{user.name || user.email}</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm text-slate-400 transition-colors hover:bg-slate-800 hover:text-red-400"
            title="Sair"
          >
            <LogOut size={15} strokeWidth={1.5} />
            <span className="hidden sm:inline">Sair</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
