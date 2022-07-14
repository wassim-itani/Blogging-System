import { Navigate } from "react-router-dom";
import { useUserContext } from "../../context";

const RestrictedRoute = ({ children }) => {
  const [user] = useUserContext();

  return <>{user ? <Navigate to="/" /> : children}</>;
};

export default RestrictedRoute;
