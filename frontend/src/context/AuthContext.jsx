import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const buildUser = async (session) => {
    if (!session) return null;

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", session.user.id)
      .single();

    return {
      id: session.user.id,
      email: session.user.email,
      role: profile?.role || "cliente",
    };
  };

  useEffect(() => {
    let mounted = true;

    const initSession = async () => {
      const { data } = await supabase.auth.getSession();
      const session = data.session;

      if (!mounted) return;

      if (session) {
        const fullUser = await buildUser(session);

        setUser(fullUser);
        setToken(session.access_token);
      } else {
        setUser(null);
        setToken(null);
      }

      setLoading(false);
    };

    initSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;

        if (session) {
          const fullUser = await buildUser(session);

          setUser(fullUser);
          setToken(session.access_token);
        } else {
          setUser(null);
          setToken(null);
        }

        setLoading(false);
      }
    );

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  async function logout() {
    await supabase.auth.signOut();

    setUser(null);
    setToken(null);

    // 🔥 REDIRECCIÓN AL LANDING
    navigate("/");
  }

  return (
    <AuthContext.Provider value={{ user, token, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);