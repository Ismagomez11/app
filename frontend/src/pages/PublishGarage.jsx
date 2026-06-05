import { useState } from "react";
export default function PublishGarage() {
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

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
        };
        const handleSubmit = (e) => {
          e.preventDefault();
          if (
              !formData.title ||
              !formData.address ||
              !formData.city ||
              !formData.pricePerDay ||
              !formData.spaces ||
              !formData.availableFrom ||
              !formData.availableTo ||
              !formData.vehicleType ||
              !formData.parkingType ||
              !formData.description
            ) {
              alert("Por favor, completa todos los campos obligatorios.");
              return;
            }
            if (formData.availableTo < formData.availableFrom) {
              alert("La fecha final no puede ser anterior a la fecha inicial.");
              return;
            }
            if (Number(formData.pricePerDay) <= 0) {
              alert("El precio por día debe ser mayor que 0.");
              return;
            }

            if (Number(formData.spaces) <= 0) {
              alert("El número de plazas debe ser mayor que 0.");
              return;
            }
          console.log("Datos del garaje:", formData);
        }
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Publicar garaje
        </h1>
        <p className="text-center text-gray-500">
            {formData.title}
        </p>
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
              placeholder="Ej: Plaza de garaje junto al aeropuerto"
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
              placeholder="Calle, número..."
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
              placeholder="Ej: Sevilla"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Precio por día (€)
            </label>
            <input
              type="number"
              name="pricePerDay"
              value={formData.pricePerDay}
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
                name="availableFrom"
                value={formData.availableFrom}
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
                name="availableTo"
                value={formData.availableTo}
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
                  name="vehicleType"
                  value={formData.vehicleType}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                >
                  <option value="">Seleccione una opción</option>
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
              name="parkingType"
              value={formData.parkingType}
              onChange={handleChange}
              className="w-full border rounded p-2"
            >
              <option value="">Seleccione una opción</option>
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
              placeholder="Describe el garaje..."
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Fotos del garaje
            </label>

            <input
              type="file"
              multiple
              className="w-full"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Publicar garaje
          </button>

        </form>
      </div>
    </div>
  );
}