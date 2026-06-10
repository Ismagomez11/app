import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 Cargar token al iniciar app
  useEffect(() => {
    const savedToken = localStorage.getItem("token");

    if (!savedToken) {
      setLoading(false);
      return;
    }

    setToken(savedToken);
    fetchUser(savedToken);
  }, []);

  // 🔥 Obtener usuario real desde backend
  async function fetchUser(token) {
    if (!token) return;

    try {
      const res = await fetch("http://localhost:3000/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Token inválido");
      }

      const data = await res.json();
      setUser(data);
    } catch (err) {
      // ❌ SOLO limpiar estado, NO tocar localStorage aquí
      setToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  // 🔑 LOGIN
  function login(newToken) {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    fetchUser(newToken);
  }

  // 🚪 LOGOUT (CLEAN + SAFE)
  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// 🔥 hook
export function useAuth() {
  return useContext(AuthContext);
}