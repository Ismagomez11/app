import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();

    if (loading) return; // 🔥 evita doble click

    setLoading(true);

    const form = e.target;

    const email = form.email.value.trim().toLowerCase().replace(/\s/g, "");
    const password = form.password.value;
    const role = form.role.value;

    try {
      // 1. CREAR USUARIO AUTH
      const { data: authData, error: authError } =
        await supabase.auth.signUp({
          email,
          password,
        });

      if (authError) throw authError;

      const user = authData.user;

      if (!user) throw new Error("No se pudo crear el usuario");

      // 2. PERFIL
      const { error: profileError } = await supabase
        .from("profiles")
        .insert({
          id: user.id,
          email,
          role,
          name: form.name.value,
          lastname: form.lastname.value,
          nif: form.nif.value,
          address: form.address.value,
          city: form.city.value,
          postalcode: form.postalcode.value,
          phone: form.phone.value,
        });

      if (profileError) throw profileError;

      alert("Usuario creado 🚀");

      navigate("/login");

    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg space-y-3"
      >
        <h1 className="text-2xl font-bold text-center">
          Crear cuenta
        </h1>

        <input className="w-full border p-2 rounded-lg" name="name" placeholder="Nombre" />
        <input className="w-full border p-2 rounded-lg" name="lastname" placeholder="Apellidos" />
        <input className="w-full border p-2 rounded-lg" name="nif" placeholder="NIF" />
        <input className="w-full border p-2 rounded-lg" name="address" placeholder="Dirección" />
        <input className="w-full border p-2 rounded-lg" name="city" placeholder="Ciudad" />
        <input className="w-full border p-2 rounded-lg" name="postalcode" placeholder="Código postal" />
        <input className="w-full border p-2 rounded-lg" name="phone" placeholder="Teléfono" />

        <input className="w-full border p-2 rounded-lg" name="email" type="email" placeholder="Email" />
        <input className="w-full border p-2 rounded-lg" name="password" type="password" placeholder="Password" />

        <select className="w-full border p-2 rounded-lg" name="role">
          <option value="cliente">Cliente</option>
          <option value="arrendador">Arrendador</option>
        </select>

        <button
          disabled={loading}
          className="w-full bg-black text-white p-2 rounded-lg hover:bg-gray-800 disabled:opacity-50"
        >
          {loading ? "Creando..." : "Registrarse"}
        </button>
      </form>
    </div>
  );
}