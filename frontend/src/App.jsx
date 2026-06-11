import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import PublishGarage from "./pages/PublishGarage";
import MyGarages from "./pages/MyGarages";
import EditGarage from "./pages/EditGarage";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>

      {/* públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* protegida */}
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
      
      <Route
        path="/editar-garaje/:id"
        element={
          <ProtectedRoute>
            <EditGarage />
          </ProtectedRoute>
        }
      />

      {/* fallback */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}