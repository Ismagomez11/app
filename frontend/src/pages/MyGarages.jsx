import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function MyGarages() {
  const [garages, setGarages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGarages = async () => {
      try {
        const { data: sessionData, error } =
          await supabase.auth.getSession();

        const session = sessionData?.session;

        if (error || !session?.access_token) {
          console.log("No session");
          setLoading(false);
          return;
        }

        const res = await fetch("http://localhost:3000/my-garages", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
        });

        const data = await res.json();

        console.log("MIS GARAJES:", data);

        setGarages(data.garages || []);
      } catch (err) {
        console.error("ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGarages();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Mis garajes
      </h1>

      {loading ? (
        <p className="text-center">Cargando...</p>
      ) : garages.length === 0 ? (
        <p className="text-center text-gray-500">
          No tienes garajes publicados
        </p>
      ) : (
        <div className="max-w-4xl mx-auto grid gap-4">
          {garages.map((g) => (
            <div
              key={g.id}
              className="bg-white p-6 rounded-xl shadow"
            >
              <h2 className="text-xl font-bold">{g.title}</h2>
              <p className="text-gray-600">
                {g.address}, {g.city}
              </p>
              <p className="mt-2 font-semibold">
                {g.price_per_day} €/día
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}