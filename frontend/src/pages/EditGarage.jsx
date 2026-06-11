import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
export default function EditGarage() {
  const { id } = useParams();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("token");

    const getGarage = async () => {
        try {
        const res = await fetch(`http://localhost:3000/garages/${id}`, {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        });

        const data = await res.json();

        console.log("Garaje a editar:", data);

        setFormData(data.garage);
        } catch (err) {
        console.error("Error obteniendo garaje:", err);
        } finally {
        setLoading(false);
        }
    };

    getGarage();
    }, [id]);
        const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
        };
    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        try {
            const res = await fetch(`http://localhost:3000/garages/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
            alert(data.message || "Error actualizando garaje");
            return;
            }

            alert("Garaje actualizado correctamente");

        } catch (err) {
            console.error("Error actualizando garaje:", err);
            alert("Error conectando con el servidor");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
            <p>Cargando...</p>
            </div>
        );
        }
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
        <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center">
            Editar garaje
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
            <label className="block mb-1 font-medium">
                Título del anuncio
            </label>
            <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border rounded p-2"
            />
            </div>
           <div>
            <label className="block mb-1 font-medium">
                Dirección
            </label>
            <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full border rounded p-2"
            />
            </div>

            <div>
            <label className="block mb-1 font-medium">
                Ciudad
            </label>
            <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full border rounded p-2"
            />
            </div>

            <div>
            <label className="block mb-1 font-medium">
                Precio por día (€)
            </label>
            <input
                type="number"
                name="price_per_day"
                value={formData.price_per_day}
                onChange={handleChange}
                className="w-full border rounded p-2"
                min="0"
            />
            </div>

            <div>
            <label className="block mb-1 font-medium">
                Número de plazas
            </label>
            <input
                type="number"
                name="spaces"
                value={formData.spaces}
                onChange={handleChange}
                className="w-full border rounded p-2"
                min="1"
            />
            </div>

            <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block mb-1 font-medium">
                Disponible desde
                </label>
                <input
                type="date"
                name="available_from"
                value={formData.available_from}
                onChange={handleChange}
                className="w-full border rounded p-2"
                />
            </div>

            <div>
                <label className="block mb-1 font-medium">
                Disponible hasta
                </label>
                <input
                type="date"
                name="available_to"
                value={formData.available_to}
                onChange={handleChange}
                className="w-full border rounded p-2"
                />
            </div>
            </div>

            <div>
            <label className="block mb-1 font-medium">
                Tipo de vehículo
            </label>

            <select
                name="vehicle_type"
                value={formData.vehicle_type}
                onChange={handleChange}
                className="w-full border rounded p-2"
            >
                <option value="coche">Coche</option>
                <option value="moto">Moto</option>
                <option value="ambos">Ambos</option>
            </select>
            </div>

            <div>
            <label className="block mb-1 font-medium">
                Tipo de plaza
            </label>

            <select
                name="parking_type"
                value={formData.parking_type}
                onChange={handleChange}
                className="w-full border rounded p-2"
            >
                <option value="garaje_privado">
                Garaje privado cubierto
                </option>
                <option value="garaje_comunitario">
                Garaje comunitario
                </option>
                <option value="parking_exterior">
                Parking exterior privado
                </option>
                <option value="parking_publico">
                Parking público
                </option>
            </select>
            </div>

            <div>
            <label className="block mb-1 font-medium">
                Descripción
            </label>
            <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border rounded p-2"
                rows="4"
            />
            </div>
            <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
            Guardar cambios
            </button>
        </form>
        </div>
    </div>
    );
}