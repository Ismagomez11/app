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