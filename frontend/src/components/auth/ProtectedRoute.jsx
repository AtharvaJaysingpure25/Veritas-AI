import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const storedUser = localStorage.getItem("user");

  if (!storedUser) {
    return <Navigate to="/login" replace />;
  }

  const user = JSON.parse(storedUser);

  if (!user.token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;