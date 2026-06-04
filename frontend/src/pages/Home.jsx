import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const getUser = async () => {
      try {
        const res = await fetch("http://localhost:3000/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        console.log("PROFILE RESPONSE:", data);

        if (res.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }

        if (!res.ok) {
          throw new Error("Error en /profile");
        }

        setUser(data);

      } catch (err) {
        console.log("PROFILE ERROR:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [navigate]);

  function logout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">

      <h1 className="text-3xl font-bold">Home</h1>

      {user ? (
        <div className="text-center space-y-2">
          <p className="text-lg">👤 {user.email}</p>
          <p className="text-sm text-gray-500">ID: {user.id}</p>

          <button
            onClick={logout}
            className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Cerrar sesión
          </button>
        </div>
      ) : (
        <p>Usuario no cargado todavía</p>
      )}
    </div>
  );
}