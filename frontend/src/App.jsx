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
import RoleProtectedRoute from "./components/RoleProtectedRoute"; // 🔥 AÑADIDO

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

        {/* 🔐 PRIVADA GENERAL */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* 🟠 SOLO ARRENDADOR */}
        <Route
          path="/publicar-garaje"
          element={
            <RoleProtectedRoute role="arrendador">
              <PublishGarage />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/mis-garajes"
          element={
            <RoleProtectedRoute role="arrendador">
              <MyGarages />
            </RoleProtectedRoute>
          }
        />

        {/* ❌ 404 */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </>
  );
}