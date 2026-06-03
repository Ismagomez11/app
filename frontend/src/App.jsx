import { useState } from "react";

export default function App() {

  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loadingRegister, setLoadingRegister] = useState(false);

  // --------------------
  // TOAST SYSTEM
  // --------------------

  const [toast, setToast] = useState(null);

  function showToast(message, type = "success") {

    setToast({ message, type });

    setTimeout(() => {
      setToast(null);
    }, 3000);
  }

  // --------------------
  // LOGIN
  // --------------------

  async function login(e) {

    e.preventDefault();

    setLoadingLogin(true);

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {

      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {

        localStorage.setItem("token", data.token);

        showToast("Login correcto 🚀", "success");

      } else {

        showToast(data.message, "error");
      }

    } catch (err) {

      showToast("Error de conexión", "error");

    } finally {

      setLoadingLogin(false);
    }
  }

  // --------------------
  // REGISTER
  // --------------------

  async function register(e) {

    e.preventDefault();

    setLoadingRegister(true);

    const form = e.target;

    const nif = form.nif.value.toUpperCase();
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    // --------------------
    // VALIDACIONES FRONT
    // --------------------

    const nifRegex = /^[0-9]{8}[A-Z]$/;

    if (!nifRegex.test(nif)) {
      showToast("DNI inválido (Introduzca un NIF/DNI valido)", "error");
      setLoadingRegister(false);
      return;
    }

    if (password.length < 6) {
      showToast("La contraseña debe tener mínimo 6 caracteres", "error");
      setLoadingRegister(false);
      return;
    }

    if (password !== confirmPassword) {
      showToast("Las contraseña no coinciden", "error");
      setLoadingRegister(false);
      return;
    }

    try {

      const res = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.value,
          lastname: form.lastname.value,
          nif,
          address: form.address.value,
          city: form.city.value,
          postalCode: form.postalCode.value,
          phone: form.phone.value,
          role: form.role.value,
          email: form.email.value,
          password
        })
      });

      const data = await res.json();

      if (res.ok) {

        showToast("Usuario creado correctamente 🚀", "success");
        form.reset();

      } else {

        showToast(data.message, "error");
      }

    } catch (err) {

      showToast("Error de conexión", "error");

    } finally {

      setLoadingRegister(false);
    }
  }

  // --------------------
  // UI
  // --------------------

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      {/* TOAST POPUP */}
      {toast && (
        <div
          className={`
            fixed top-5 right-5
            px-5 py-3
            rounded-xl
            text-white
            shadow-lg
            z-50
            ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}
          `}
        >
          {toast.message}
        </div>
      )}

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

        {/* LOGIN */}
        <div className="bg-white rounded-3xl shadow-xl p-8">

          <h1 className="text-3xl font-bold mb-8 text-center">
            Login 🚗
          </h1>

          <form onSubmit={login} className="space-y-4">

            <input name="email" type="email" placeholder="Email" required className="w-full border p-4 rounded-2xl" />

            <input name="password" type="password" placeholder="Password" required className="w-full border p-4 rounded-2xl" />

            <button
              disabled={loadingLogin}
              className="w-full bg-black text-white p-4 rounded-2xl disabled:opacity-50"
            >
              {loadingLogin ? "Entrando..." : "Entrar"}
            </button>

          </form>
        </div>

        {/* REGISTER */}
        <div className="bg-white rounded-3xl shadow-xl p-8">

          <h1 className="text-3xl font-bold mb-8 text-center">
            Registro 👤
          </h1>

          <form onSubmit={register} className="space-y-4">

            <input name="name" placeholder="Nombre" required className="w-full border p-4 rounded-2xl" />
            <input name="lastname" placeholder="Apellidos" required className="w-full border p-4 rounded-2xl" />

            <input name="nif" placeholder="NIF / DNI" required className="w-full border p-4 rounded-2xl" />

            <input name="address" placeholder="Dirección" required className="w-full border p-4 rounded-2xl" />

            <div className="grid grid-cols-2 gap-4">
              <input name="city" placeholder="Ciudad" required className="w-full border p-4 rounded-2xl" />
              <input name="postalCode" placeholder="Código postal" required className="w-full border p-4 rounded-2xl" />
            </div>

            <input name="phone" placeholder="Teléfono" required className="w-full border p-4 rounded-2xl" />

            <div className="bg-gray-100 rounded-2xl p-4">


              <label className="flex gap-2 mb-2">
                <input type="radio" name="role" value="tenant" defaultChecked />
                Alquilar garajes
              </label>

              <label className="flex gap-2">
                <input type="radio" name="role" value="owner" />
                Publicar garajes
              </label>

            </div>

            <input name="email" type="email" placeholder="Correo electrónico" required className="w-full border p-4 rounded-2xl" />
            <input name="password" type="password" placeholder="Contraseña" required className="w-full border p-4 rounded-2xl" />
            <input name="confirmPassword" type="password" placeholder="Confirmar contraseña" required className="w-full border p-4 rounded-2xl" />

            <button
              disabled={loadingRegister}
              className="w-full bg-black text-white p-4 rounded-2xl disabled:opacity-50"
            >
              {loadingRegister ? "Registrando..." : "Registrarse"}
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}