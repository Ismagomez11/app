import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const { token, user, logout } = useAuth();

  const [openAuth, setOpenAuth] = useState(false);
  const [openUser, setOpenUser] = useState(false);

  function handleLogout() {
    logout();
    setOpenUser(false);
    navigate("/");
  }

  return (
    <nav className="bg-black text-white px-6 py-4 flex justify-between items-center">

      {/* IZQUIERDA */}
      <div className="flex gap-4 items-center">

        {/* 🔥 FIX: navegación dinámica según login */}
        <Link
          to={token ? "/home" : "/"}
          className="font-bold"
          onClick={() => {
            setOpenAuth(false);
            setOpenUser(false);
          }}
        >
          Mi App
        </Link>

      </div>

      {/* DERECHA */}
      <div className="flex items-center gap-4">

        {/* ICONO SI NO ESTÁ LOGUEADO */}
        {!token && (
          <div className="relative">

            <button
              onClick={() => setOpenAuth(!openAuth)}
              className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center"
            >
              👤
            </button>

            {openAuth && (
              <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg z-50">

                <Link
                  to="/login"
                  onClick={() => setOpenAuth(false)}
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Iniciar sesión
                </Link>

                <Link
                  to="/register"
                  onClick={() => setOpenAuth(false)}
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Crear cuenta
                </Link>

              </div>
            )}
          </div>
        )}

        {/* ICONO SI ESTÁ LOGUEADO */}
        {token && (
          <div className="relative">

            <button
              onClick={() => setOpenUser(!openUser)}
              className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center"
            >
              👤
            </button>

            {openUser && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg z-50">

                <Link
                  to="/profile"
                  onClick={() => setOpenUser(false)}
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Mi perfil
                </Link>

                <Link
                  to="/mis-garajes"
                  onClick={() => setOpenUser(false)}
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Mis garajes
                </Link>

                <Link
                  to="/publicar-garaje"
                  onClick={() => setOpenUser(false)}
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Publicar garaje
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                >
                  Cerrar sesión
                </button>

              </div>
            )}
          </div>
        )}

      </div>
    </nav>
  );
}