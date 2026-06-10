import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { token, user, logout } = useAuth();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <nav className="bg-black text-white px-6 py-4 flex justify-between items-center">

      <div className="flex gap-4 items-center">
        <Link to="/" className="font-bold">
          Mi App
        </Link>

        {!token && (
          <>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        {token && (
          <>
            <Link to="/home">Dashboard</Link>
            <Link to="/profile">Perfil</Link>
          </>
        )}
      </div>

      <div className="flex items-center gap-4">
        {token && (
          <span>
            {user?.email}
          </span>
        )}

        {token && (
          <button
            onClick={handleLogout}
            className="bg-red-500 px-3 py-1 rounded"
          >
            Cerrar sesión
          </button>
        )}
      </div>

    </nav>
  );
}