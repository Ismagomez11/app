import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const { token, user, logout } = useAuth();

  const [openMenu, setOpenMenu] = useState(false);

  const role = user?.role;

  function handleLogout() {
    logout();
    setOpenMenu(false);
    navigate("/");
  }

  return (
    <nav className="bg-black text-white px-6 py-4 flex justify-between items-center">

      {/* IZQUIERDA */}
      <div className="flex items-center gap-4">
        <Link to={token ? "/home" : "/"} className="font-bold">
          Mi App
        </Link>
      </div>

      {/* DERECHA */}
      <div className="flex items-center gap-4">

        {/* =========================
            🔓 NO LOGUEADO
        ========================= */}
        {!token && (
          <div className="relative">

            <button
              onClick={() => setOpenMenu(!openMenu)}
              className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center"
            >
              👤
            </button>

            {openMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg z-50 flex flex-col">

                <Link
                  to="/login"
                  onClick={() => setOpenMenu(false)}
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  Iniciar sesión
                </Link>

                <Link
                  to="/register"
                  onClick={() => setOpenMenu(false)}
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  Crear cuenta
                </Link>

              </div>
            )}
          </div>
        )}

        {/* =========================
            🔐 LOGUEADO
        ========================= */}
        {token && (
          <div className="relative">

            <button
              onClick={() => setOpenMenu(!openMenu)}
              className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center"
            >
              👤
            </button>

            {openMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg z-50 flex flex-col">

                {/* PERFIL */}
                <Link
                  to="/profile"
                  onClick={() => setOpenMenu(false)}
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  Mi perfil
                </Link>

                {/* 🟠 ARRENDADOR */}
                {role === "arrendador" && (
                  <>
                    <Link
                      to="/mis-garajes"
                      onClick={() => setOpenMenu(false)}
                      className="px-4 py-2 hover:bg-gray-100"
                    >
                      Mis garajes
                    </Link>

                    <Link
                      to="/publicar-garaje"
                      onClick={() => setOpenMenu(false)}
                      className="px-4 py-2 hover:bg-gray-100"
                    >
                      Publicar garaje
                    </Link>
                  </>
                )}

                {/* 🟢 CLIENTE */}
                {role === "cliente" && (
                  <Link
                    to="/home"
                    onClick={() => setOpenMenu(false)}
                    className="px-4 py-2 hover:bg-gray-100"
                  >
                    Buscar garajes
                  </Link>
                )}

                {/* LOGOUT */}
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-left text-red-500 hover:bg-gray-100"
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