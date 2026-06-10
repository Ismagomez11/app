import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [toast, setToast] = useState(null);

  const navigate = useNavigate();
  const auth = useAuth();

  function showToast(message, type = "success") {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }

  async function login(e) {
    e.preventDefault();
    setLoadingLogin(true);

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      console.log("LOGIN RESPONSE:", data);

      if (!res.ok) {
        showToast(data.message || "Error al iniciar sesión", "error");
        return;
      }

      if (!data.token) {
        showToast("El backend no devolvió token", "error");
        return;
      }

      // 🔥 AUTH CONTEXT (NUEVO)
      auth.login(data.token);

      showToast("Login correcto 🚀", "success");

      setTimeout(() => {
        navigate("/home");
      }, 500);

    } catch (err) {
      console.error(err);
      showToast("Error de conexión con el servidor", "error");
    } finally {
      setLoadingLogin(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">

      {toast && (
        <div
          className={`fixed top-5 right-5 px-4 py-2 rounded text-white ${
            toast.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {toast.message}
        </div>
      )}

      <form
        onSubmit={login}
        className="bg-white p-8 rounded-xl shadow w-96 space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Login</h1>

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          required
        />

        <button
          disabled={loadingLogin}
          className="w-full bg-black text-white p-2 rounded"
        >
          {loadingLogin ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}