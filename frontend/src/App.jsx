import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";
import PublishGarage from "./pages/PublishGarage";
import MyGarages from "./pages/MyGarages";

import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

import Navbar from "./components/Navbar";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>

        {/* 🌍 PUBLICA */}
        <Route path="/" element={<Landing />} />

        {/* 🔓 SOLO SI NO ESTÁ LOGUEADO */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        {/* 🔐 PRIVADAS */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/publicar-garaje"
          element={
            <ProtectedRoute>
              <PublishGarage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/mis-garajes"
          element={
            <ProtectedRoute>
              <MyGarages />
            </ProtectedRoute>
          }
        />

        {/* ❌ 404 */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </>
  );
}