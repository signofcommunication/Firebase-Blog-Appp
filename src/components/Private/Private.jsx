import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../utilities/FirebaseProvider";

function Private() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default Private;
