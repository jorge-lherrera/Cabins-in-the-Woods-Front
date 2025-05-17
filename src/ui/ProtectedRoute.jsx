import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  const { isLoading, isAuthenticated } = useUser();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/login");
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading)
    return (
      <div className="h-screen bg-grey-50 flex items-center justify-center">
        <Spinner />
      </div>
    );

  if (isAuthenticated) return children;

  return null;
}

export default ProtectedRoute;
