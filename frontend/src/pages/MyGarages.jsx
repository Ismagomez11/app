import { useEffect, useState } from "react";

export default function MyGarages() {
  const [garages, setGarages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) {
    setLoading(false);
    return;
  }
  const getMyGarages = async () => {
  try {
    const res = await fetch("http://localhost:3000/my-garages", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

        console.log("Mis garajes:", data);

        setGarages(data.garages);
    } catch (err) {
        console.error("Error obteniendo garajes:", err);
    } finally {
        setLoading(false);
    }
    };
    getMyGarages();
  }, []);
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Mis garajes
      </h1>
      {loading ? (
    <p className="text-center">Cargando garajes...</p>
    ) : garages.length === 0 ? (
    <p className="text-center text-gray-500">
        Todavía no has publicado ningún garaje.
    </p>
    ) : (
    <div className="max-w-4xl mx-auto grid gap-4">
        {garages.map((garage) => (
        <div
            key={garage.id}
            className="bg-white p-6 rounded-xl shadow"
        >
            <h2 className="text-xl font-bold">{garage.title}</h2>
            <p className="text-gray-600">{garage.address}, {garage.city}</p>
            <p className="mt-2 font-semibold">
            {garage.price_per_day} €/día
            </p>
        </div>
        ))}
    </div>
    )}
    </div>
  );
}