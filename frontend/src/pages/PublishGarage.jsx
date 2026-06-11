import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../supabaseClient";

export default function PublishGarage() {
  const { user, loading } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    address: "",
    city: "",
    pricePerDay: "",
    spaces: "",
    availableFrom: "",
    availableTo: "",
    vehicleType: "",
    parkingType: "",
    description: "",
    photos: null,
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (loading || submitting) return;

    if (!user) {
      alert("Debes iniciar sesión para publicar un garaje.");
      return;
    }

    try {
      setSubmitting(true);

      const { data, error } = await supabase.auth.getSession();

      const session = data?.session;

      if (error || !session?.access_token) {
        alert("Sesión inválida. Inicia sesión otra vez.");
        return;
      }

      const token = session.access_token;

      const res = await fetch("http://localhost:3000/garages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      console.log("STATUS:", res.status);
      console.log("BACKEND:", result);

      if (!res.ok) {
        alert(result.message || "Error al publicar");
        return;
      }

      alert("Garaje publicado correctamente 🚀");

      setFormData({
        title: "",
        address: "",
        city: "",
        pricePerDay: "",
        spaces: "",
        availableFrom: "",
        availableTo: "",
        vehicleType: "",
        parkingType: "",
        description: "",
        photos: null,
      });
    } catch (err) {
      console.error(err);
      alert("Error de red");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Publicar garaje
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input name="title" value={formData.title} onChange={handleChange} placeholder="Título" className="w-full border rounded p-2" />
          <input name="address" value={formData.address} onChange={handleChange} placeholder="Dirección" className="w-full border rounded p-2" />
          <input name="city" value={formData.city} onChange={handleChange} placeholder="Ciudad" className="w-full border rounded p-2" />

          <input type="number" name="pricePerDay" value={formData.pricePerDay} onChange={handleChange} placeholder="Precio por día" className="w-full border rounded p-2" />

          <input type="number" name="spaces" value={formData.spaces} onChange={handleChange} placeholder="Plazas" className="w-full border rounded p-2" />

          <input type="date" name="availableFrom" value={formData.availableFrom} onChange={handleChange} className="w-full border rounded p-2" />
          <input type="date" name="availableTo" value={formData.availableTo} onChange={handleChange} className="w-full border rounded p-2" />

          <select name="vehicleType" value={formData.vehicleType} onChange={handleChange} className="w-full border rounded p-2">
            <option value="">Tipo vehículo</option>
            <option value="coche">Coche</option>
            <option value="moto">Moto</option>
            <option value="ambos">Ambos</option>
          </select>

          <select name="parkingType" value={formData.parkingType} onChange={handleChange} className="w-full border rounded p-2">
            <option value="">Tipo plaza</option>
            <option value="garaje_privado">Privado</option>
            <option value="garaje_comunitario">Comunitario</option>
            <option value="parking_exterior">Exterior</option>
            <option value="parking_publico">Público</option>
          </select>

          <textarea name="description" value={formData.description} onChange={handleChange} className="w-full border rounded p-2" rows="4" />

          <button
            disabled={submitting}
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            {submitting ? "Publicando..." : "Publicar"}
          </button>
        </form>
      </div>
    </div>
  );
}