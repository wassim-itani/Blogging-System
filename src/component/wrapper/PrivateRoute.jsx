import { useUserContext } from "../../context";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({children}) => {
  const [user] = useUserContext();

  return <>{!user ? <Navigate to="/login" /> : children}</>;
};

export default PrivateRoute;
