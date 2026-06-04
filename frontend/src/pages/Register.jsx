import { useState } from "react";

export default function Register() {

  const [loadingRegister, setLoadingRegister] = useState(false);
  const [toast, setToast] = useState(null);

  function showToast(message, type = "success") {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }

  async function register(e) {
    e.preventDefault();
    setLoadingRegister(true);

    const form = e.target;

    const nif = form.nif.value.toUpperCase();
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    const nifRegex = /^[0-9]{8}[A-Z]$/;

    if (!nifRegex.test(nif)) {
      showToast("DNI inválido", "error");
      setLoadingRegister(false);
      return;
    }

    if (password.length < 6) {
      showToast("Password mínima 6 caracteres", "error");
      setLoadingRegister(false);
      return;
    }

    if (password !== confirmPassword) {
      showToast("Las passwords no coinciden", "error");
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
        showToast("Usuario creado 🚀", "success");
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

  return (
    <div className="min-h-screen flex items-center justify-center">

      {toast && (
        <div className={`fixed top-5 right-5 px-4 py-2 rounded text-white ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}`}>
          {toast.message}
        </div>
      )}

      <form onSubmit={register} className="bg-white p-8 rounded-xl shadow w-[500px] space-y-3">

        <h1 className="text-2xl font-bold text-center">Registro</h1>

        <input name="name" placeholder="Nombre" className="w-full border p-2 rounded" required />
        <input name="lastname" placeholder="Apellidos" className="w-full border p-2 rounded" required />
        <input name="nif" placeholder="NIF" className="w-full border p-2 rounded" required />
        <input name="address" placeholder="Dirección" className="w-full border p-2 rounded" required />
        <input name="city" placeholder="Ciudad" className="w-full border p-2 rounded" required />
        <input name="postalCode" placeholder="Código postal" className="w-full border p-2 rounded" required />
        <input name="phone" placeholder="Teléfono" className="w-full border p-2 rounded" required />

        <div>
          <label>
            <input type="radio" name="role" value="tenant" defaultChecked />
            Alquilar
          </label>

          <label className="ml-4">
            <input type="radio" name="role" value="owner" />
            Publicar
          </label>
        </div>

        <input name="email" type="email" placeholder="Email" className="w-full border p-2 rounded" required />
        <input name="password" type="password" placeholder="Password" className="w-full border p-2 rounded" required />
        <input name="confirmPassword" type="password" placeholder="Confirmar password" className="w-full border p-2 rounded" required />

        <button
          disabled={loadingRegister}
          className="w-full bg-black text-white p-2 rounded"
        >
          {loadingRegister ? "Registrando..." : "Registrarse"}
        </button>

      </form>
    </div>
  );
}