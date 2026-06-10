import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-bold">
        Bienvenido a mi App 🚀
      </h1>

      <p className="text-gray-600">
        Gestiona tu cuenta de forma sencilla
      </p>

      <div className="flex gap-4">
        <Link
          to="/login"
          className="bg-black text-white px-4 py-2 rounded"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="bg-gray-300 px-4 py-2 rounded"
        >
          Registro
        </Link>
      </div>
    </div>
  );
}