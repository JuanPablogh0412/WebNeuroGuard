import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import Spinner from "./ui/Spinner.jsx";

// Cadena de guardas: sin sesión → /login; sin patient_id → /setup; ambos OK → renderiza hijo.
export default function ProtectedRoute({ children }) {
  const { user, patientId, loading } = useAuth();
  if (loading) return <Spinner />;
  if (!user) return <Navigate to="/login" replace />;
  if (!patientId) return <Navigate to="/setup" replace />;
  return children;
}
