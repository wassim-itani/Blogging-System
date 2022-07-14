import { useReducer, createContext, useContext} from "react";
import userReducer from "../reducer/user";

const userContext = createContext();
export const useUserContext = () => useContext(userContext);

const UserContext = ({ children }) => {
  const [user, dispatch] = useReducer(userReducer, null);
  

  return (
    <userContext.Provider value={[user, dispatch]}>
      {children}
    </userContext.Provider>
  );
};

export default UserContext;
