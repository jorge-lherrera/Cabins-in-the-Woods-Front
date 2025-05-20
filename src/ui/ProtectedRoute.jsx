import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSession } from "../hooks/auth/useSession";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { data, isLoading } = useSession();

  useEffect(() => {
    if (!isLoading && !data?.loggedIn) navigate("/login");
  }, [isLoading, data, navigate]);

  if (isLoading)
    return (
      <div className="h-screen bg-grey-50 flex items-center justify-center">
        <Spinner />
      </div>
    );

  if (data?.loggedIn) return children;

  return null;
}

export default ProtectedRoute;
